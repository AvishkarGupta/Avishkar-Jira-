import { Router } from "express";
import { getAllProfiles, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyjwt } from "../middlewares/auth.middelware.js";

const router = Router()

router.route("/register").post(verifyjwt, upload.fields([{name: "avatar", maxCount: 1}]) , registerUser)

router.route("/login").post(loginUser)
router.route("/logout").get(verifyjwt, logoutUser)
router.route("/all-users").get(verifyjwt, getAllProfiles)





export default router