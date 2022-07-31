import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  
  },
  otp: {
    type: String,
  },
  token: {
    type: String,
  },
  location: {
    type: { type: String },
    coordinates: [Number, Number]
  },
  socketId : {
    type: String
  },
  isOnline: {
    type: Boolean,
    default: false
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

userSchema.set("autoIndex", true);

userSchema.index({ location: "2dsphere"});

const user = model("User", userSchema);

export default user;
