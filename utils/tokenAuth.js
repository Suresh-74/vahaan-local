import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import { TOKEN_KEY } from "../config.js";

export async function verifyToken(req, res, next) {
 
  const token =
    req.body.token || req.query.token || req.headers.token || req.params.token;


  const userId = req.body.userId || req.query.userId || req.headers.userid || req.params.id;

  
    if (!token) {
    return res.status(403).send("Token is required for authentication");
  }
  try {
    const data = await User.findOne({ _id: userId });

       
    if (data.token === token) {
       return next();
    } else {
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    next(err);
  }
}



