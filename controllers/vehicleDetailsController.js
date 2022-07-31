import VehicleDetail from "../models/vehicleDetailsModel.js";

import {
  getAll,
  getOne,
  deleteOne,
} from "./baseController.js";

export async function createVehicle(req, res, next){
    try{


       const userId = req.headers.userid ;

     
        const data = req.body;

      const vehicleData = await VehicleDetail.create({
          brandName: data.brandName,
          phone: data.phone,
          year: data.year,
          registerNumber: data.registerNumber,
          userId: userId,
      });
      res.status(201).json({
          status: "Created",
          message: "Vehicle Details Created Successfully",
          data: vehicleData,
      })
    }catch(error){
        next(error);
    }
}
export async function updateVehicle(req, res, next){
    try{
        const data= req.body;

        const editData= {
            brandName: data.brandName, 
            phone: data.phone,
            year: data.year,
            registerNumber: data.registerNumber,

        }

        const editDetails = await VehicleDetail.findByIdAndUpdate(data.vehicleId, editData, {
            new: true,
            runValidators: true,
        }); 
        res.status(201).json({
            message: "Updated Vehicle Details Successfully",
            data: editDetails,
        });

    }catch(error){
        next(error);
    }
}
export async function getVehicle(req, res, next){
    try{
        const id= req.params.id;

        const vehicleData= await VehicleDetail.findOne({ _id: id}).populate("userId");

        res.status(200).json({
            status: "Get Vehicle Details",
            vehicleData,
        })
    }catch(error){
        next(error);
    }
}
export async function getAllVehicle(req, res, next){
    try{
       

        const vehicleData= await VehicleDetail.find().populate("userId");

        res.status(200).json({
            status: "Get Vehicle Details",
            vehicleData,
        })
    }catch(error){
        next(error);
    }
}

export const deleteVehicle = deleteOne(VehicleDetail)

