import User from "../models/userModel.js";
import dotenv from "dotenv";
import getRandomNumber from "../utils/getRandomNumber.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config({ silent: true });
import {
  getAll,
  getOne,
  deleteOne,
  createOne,
  updateOne,
} from "./baseController.js";
import getRandomNumberForOtp from "../utils/otp.js";
import {TOKEN_KEY} from "../config.js";

export async function createUser(req, res, next) {
  try {
    const data = req.body;

    const exist = await User.findOne({ phone: data.phone });

    if (!exist) {
      const otp = getRandomNumberForOtp(1000, 9999);

      // const tokenId = jwt.sign({ name: data.name , phone: data.phone }, TOKEN_KEY, {
      //   expiresIn: "10m",
      // });

    
   

      const user = await User.create({
        name: data.name,
        phone: data.phone,
        otp: otp,
        location: data.location
        // token: tokenId,
      });

      return res.status(201).json({
        status: "New User",
        message: "User Created Successfully",
        data: user,
      });
    } else {
      const otp = getRandomNumberForOtp(1000, 9999);
      const tokenId = jwt.sign({ name: data.name , phone: data.phone }, TOKEN_KEY, {
        expiresIn: "10m",
      });
      const editUser = {
        otp: otp,
        token: tokenId
      };
     

     
      const updateOtp = await User.findByIdAndUpdate(exist._id, editUser, {
        new: true,
        runValidators: true,
      });
      return res.status(201).json({
        status: "Updated",
        data: updateOtp,
      });

      // res.status(200).json({
      //   status: "Existing User",
      //   data: exist.otp,
      // });
    }
  } catch (error) {
    next(error);
    return;
  }
}

export async function getOtp(req, res, next) {
  try {
    const data = req.body;

    const userId = req.headers.userid;

   
    const userData = await User.findOne({ _id: userId });
  

    if (data.otp === userData.otp) {

      const tokenId = jwt.sign({ name: userData.name , phone: userData.phone }, TOKEN_KEY, {
        expiresIn: "10m",
      });

      const editData= {
        token: tokenId

    }

      const updateOtp = await User.findByIdAndUpdate(userData._id, editData, {
        new: true,
        runValidators: true,
      });

      const token= "Bearer "+tokenId;
      
         
    

      res.status(200).json({
        data: {userData,token}
      });
    } else {
      res.status(200).json({
        message: "Invalid OTP !!! Enter Valid OTP",
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { name, phone } = req.body;

    const user = await User.findOne({
      name: name,
      phone: phone,
    });

    const tokenId = getRandomNumber();

    if (user) {
      const editUser = {
        token: tokenId,
      };

      const updateToken = await User.findByIdAndUpdate(user._id, editUser, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({
        status: "Login Successfully",
        user,
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "Invalid Credential",
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    const data = req.body;

    const userData = await User.findOne({ phone: data.phone });
    if (userData) {
      const editData = {
        token: "",
      };

      const editUser = await User.findByIdAndUpdate(userData._id, editData, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "Logout Successfully",
        editUser,
      });
    } else {
      res.status(400).json({
        status: "Bad Request",
        message: "Invalid Credential",
      });
    }
  } catch (error) {
    next(error);
  }
}
export async function updateUSer(req, res, next) {
  try {
    const data = req.body;

    const editData = {
      name: data.name,
      phone: data.phone,
    };

    const editDetails = await User.findByIdAndUpdate(data.userId, editData, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      message: "Updated User Details Successfully",
      data: editDetails,
    });
  } catch (error) {
    next(error);
  }
}

 export async function findNearByUser (req, res, next) {
    let data = req.body;
    
     
    const userLocation = await User.find({ 
      location: { $near : { $geometry : { type: "Point", coordinates: [data.long, data.lat ]}, 
      $maxDistance : 5000 }}});

      res.status(201).json({
        status: "success",
        message: "Created Successfully",
        data: userLocation
      })
  }

export const getAllUser = getAll(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
