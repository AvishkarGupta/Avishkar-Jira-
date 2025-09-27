import { Router } from "express";
import { editUserAvatar, editUserName, getAllProfiles, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyjwt } from "../middlewares/auth.middelware.js";

const router = Router()

router.route("/register").post(verifyjwt, upload.fields([{name: "avatar", maxCount: 1}]) , registerUser)

router.route("/login").post(loginUser)
router.route("/logout").get(verifyjwt, logoutUser)
router.route("/all-users").get(verifyjwt, getAllProfiles)
router.route("/edit-avatar").post(verifyjwt, upload.fields([{name: "avatar", maxCount: 1}]), editUserAvatar)
router.route("/edit-name").post(verifyjwt, editUserName)





export default router