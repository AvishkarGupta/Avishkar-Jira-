import { Router } from "express";
import { verifyjwt } from "../middlewares/auth.middelware.js";
import {createTask, getAllTask, getMyTasks, assignedTasks, updatepriority, updateAssignee, updateOwner, updateStatus, updateCategory, updateTitle, updateDescription, updateResources, getTask, getFilterdTasks} from "../controllers/task.controller.js"

const router = Router() 

router.route("/create-task").post(verifyjwt, createTask)
router.route("/get-task").post(verifyjwt, getTask)
router.route("/all-tasks").get(verifyjwt, getAllTask)
router.route("/filterd-tasks").post(verifyjwt, getFilterdTasks)
router.route("/my-tasks").get(verifyjwt, getMyTasks)
router.route("/assigned-tasks").get(verifyjwt, assignedTasks)

// update tasks
router.route("/update-priority").post(verifyjwt, updatepriority)
router.route("/update-category").post(verifyjwt, updateCategory)
router.route("/update-status").post(verifyjwt, updateStatus)
router.route("/update-owner").post(verifyjwt, updateOwner)
router.route("/update-assignee").post(verifyjwt, updateAssignee)
router.route("/update-title").post(verifyjwt, updateTitle)
router.route("/update-description").post(verifyjwt, updateDescription)
router.route("/update-resources").post(verifyjwt, updateResources)

export default router;