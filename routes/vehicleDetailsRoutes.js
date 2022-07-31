import { Router } from "express";
const router = Router();

import {
  createVehicle,
  updateVehicle,
  getAllVehicle,
  getVehicle,
  deleteVehicle,
} from "../controllers/vehicleDetailsController.js";
import {verifyToken } from "../utils/tokenAuth.js";


router.route("/create").post(verifyToken,createVehicle);


router.route("/update").patch(verifyToken,updateVehicle);

router.route("/list").get(verifyToken,getAllVehicle);

router.route("/delete/:id").delete(verifyToken,deleteVehicle);

router.route("/:id").get(verifyToken,getVehicle);




export default router; 

