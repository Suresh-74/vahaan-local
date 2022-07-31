import { Router } from "express";
const router = Router();

import {
  createUser,
  updateUSer,
  deleteUser,
  getAllUser,
  getUser,
  login,
  logout,
  getOtp,
  findNearByUser,
} from "../controllers/userController.js";

import {verifyToken } from "../utils/tokenAuth.js";



router.route("/create").post(createUser);

router.route("/list").get(verifyToken, getAllUser);

router.route("/update").patch(verifyToken,updateUSer);

router.route("/delete/:id").delete(verifyToken,deleteUser);

router.route("/verify/otp").post(getOtp);

router.route("/:id").get(verifyToken,getUser);

router.route("/find/nearby").get(findNearByUser)

router.route("/login").post(login);

router.route("/logout").post(logout);





export default router;
