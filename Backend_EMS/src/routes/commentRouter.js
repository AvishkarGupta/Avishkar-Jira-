import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middelware.js";
import { addComment, deleteComment, editComment } from "../controllers/comment.controller.js"

const router = Router()

router.route("/add-comment").post(verifyjwt, addComment);
router.route("/delete-comment").post(verifyjwt, deleteComment);
router.route("/edit-comment").post(verifyjwt, editComment);


export default router;