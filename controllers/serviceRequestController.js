import serviceRequest from "../models/serviceRequestModel.js";

import { getAll, getOne, deleteOne } from "./baseController.js";


export async function createServiceRequest(req, res, next){
    try{

    
        const data= req.body;

        const userId =req.headers.userid ;

          
        const file = req?.files;

        const auido_PATH = [];

        for (let i = 0; i < req.files.length; i++) {
            auido_PATH.push(file[i].location)
        }
        
        // const auido_PATH =file[0]?.location;

            const serviceRequestData = await serviceRequest.create({
          
                text: data.text,
                userId:userId,
                audioURL: auido_PATH,
            });

            return res.status(200).json({
                message: " Service Request created successfully ",
                serviceRequestData,
                
            });

       }catch(error){
        next(error);
    }
}

export async function updateServiceRequest(req, res, next){
    try{
        const data= req.body;

        const editDetails = await serviceRequest.findByIdAndUpdate(data.serviceId, data,{
            new: true,
            runValidators: true,
        });
        res.status(201).json({
            message: "Service Request Details Updated Successfully",
            data: editDetails,
        })

    }catch(error){
        next(error);
    }
}
export async function getServiceRequest(req, res, next){
    try{
        const id = req.params.id;
      

        const serviceData = await serviceRequest.findOne({ userId: id}).populate("userId");

        res.status(200).json({
            message: "Get Service Request Details Successfully",
            data: serviceData,
        })
    }catch(error){
        next(error);
    }
}

export async function getAllServiceRequest(req, res, next){
    try{
        const id = req.headers.userid;

      
      

        const serviceData = await serviceRequest.find({ userId: id}).populate("userId");

        res.status(200).json({
            message: "Get User All Service Request Details Successfully",
            data: serviceData,
        })
    }catch(error){
        next(error);
    }
}


export async function voiceUpload(req, res, next){
    try{
      const userId = req.body.userId;
            
      const file = req.files;
      
      const auido_PATH =file[0].location;

      const editData={
        audioURL: auido_PATH,
       
    }
      const userData = await serviceRequest.findOne({ userId: userId});

      const editDetails = await serviceRequest.findByIdAndUpdate(userData._id, editData,{
        new: true,
        runValidators: true,
    });

        res.status(200).json({
            message: " Service Request Audio File Upload Successfully",
            file,
            editDetails,
            
        });
    }catch (error){
        next(error);
    }
}
export const deleteServiceRequest = deleteOne(serviceRequest);



