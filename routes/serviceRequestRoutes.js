import { Router } from "express";
import upload from "../utils/s3.js"

const router = Router();

import {
createServiceRequest,
getServiceRequest, 
getAllServiceRequest,
updateServiceRequest,
deleteServiceRequest,


} from "../controllers/serviceRequestController.js";
import {verifyToken } from "../utils/tokenAuth.js";



router.route("/create").post(upload, verifyToken,createServiceRequest);

router.route("/update").patch(upload,updateServiceRequest);

router.route("/list").get(verifyToken ,getAllServiceRequest);

router.route("/delete/:id").delete(verifyToken,deleteServiceRequest);

router.route("/:id").get(verifyToken,getServiceRequest);

// router.route("/voice/upload").post(upload,voiceUpload);





export default router;



 

