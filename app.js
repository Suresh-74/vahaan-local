import express, { json } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import globalErrHandler from "./controllers/errorController.js";
import AppError from "./utils/appError.js";
import jwt from "jsonwebtoken";
const app = express();

// map integration
import { createServer} from 'http';
import { Server} from 'socket.io';
import User from "./models/userModel.js";

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin : '*'}});



io.use(function (socket, next){
  console.log(socket.handshake.query && socket.handshake.query.token)

  if(socket.handshake.query && socket.handshake.query.token){

    jwt.verify(socket.handshake.query.token.split(" ")[1], process.env.TOKEN_KEY, function (err, decoded) {
      if(err){
        return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      }
    })

  }
  else {
    console.log("Error check");
    next(new Error ('Authentication Error'));
  }
})

io.on("connection", (socket) => {
  let token = socket.handshake.query && socket.handshake.query.token;
  console.log("New clinet connected", socket.id, token);
  const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_KEY);

  socket.on('post live location', function (resData) {
    let data = resData[0];

    console.log("post data", data, socket.id);

    User.findOneAndUpdate({ "email": decoded.email },
    { $set: {location: [data.long, data.lat], isOnline: true, socketid: socket.id }} , function (err, result){
      if(err){
        console.log("err");
        return;
      } if (result){
        console.log(result);
      }
    })


  })


socket.on('disconnect' , () =>{
  console.log("..decode..", decoded.email, typeof decoded.email)
  User.findOneAndUpdate({ "email:": decoded.email}, { $set: { isOnline: false, socketid: ''}}, function (err, result){
    if(err) {
      console.log(err);
      return;
    } if (result){
      console.log(result);
    }
  })
  console.log("Client disconnected", socket.id);
});
});
  
//Routes
import userRoutes from "./routes/userRoutes.js";

import vehicleDetailsRoutes from "./routes/vehicleDetailsRoutes.js";

import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import user from "./models/userModel.js";


//Allow Cross-Orgin Requests
app.use(cors());

// Set Security HTTP Headers
app.use(helmet());

// Limit Request From The Same API
const limiter = rateLimit({
  max: 150000,
  windowsMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, Please try again in an hour",
});

app.use("/api", limiter);

//Body parser, reading data from the body into req.body

app.use(
  json({
    limit: "25MB",
  })
);

// Data sanitization against No Sql query injection
app.use(mongoSanitize());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/vehicle", vehicleDetailsRoutes);

app.use("/api/v1/serviceRequest", serviceRequestRoutes)

//Data sanitization against XSS(clean user input from malicious HTML code)

app.use(xss());

// PRevent parameter pollution
app.use(hpp());

// Haandle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "Fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

export default app;
