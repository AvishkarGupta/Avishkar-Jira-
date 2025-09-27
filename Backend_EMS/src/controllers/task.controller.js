import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {Task} from "../models/task.model.js"
import {User} from "../models/user.model.js"
import { SavedFilter } from "../models/savedFilters.model.js";

const createTask = asyncHandler( async(req, res) => {

  const {_id} = req.user
  const {title, assignee, description, category, status, resources, dueDate, priority} = req.body

  if (!title || !category){
      throw new ApiError(400, "Title and Category is required.")
  }

  const assigneeName = assignee.trim()

  const assigneTo = await User.findOne({Name: assigneeName}) //Name 

  const owner = await User.findById(_id)
  
  if (!assigneTo){
    throw new ApiError(400, `${assignee} doesn't exist in our database.`)
  }

  const prioptions = ["High", "Low", "Medium", "Blocker"]
  let priorityOptions = prioptions.filter((option)=>{return option.toLocaleLowerCase() !== priority.toLocaleLowerCase()})

  const statoptions = ["To do", "New", "In Progress", "In Verification", "RFV", "Resolved", "Closed", "Re Opened"]
  let statusOptions = statoptions.filter((state)=>{return state.toLocaleLowerCase() !== status.toLocaleLowerCase()})
  
  const catoptions = ["Development", "QA", "UI and UX", "Debugging"]
  let categoryOptions = catoptions.filter((cat)=>{return cat.toLocaleLowerCase() !== category.toLocaleLowerCase()})

  const task = await Task.create({
    title, assigneeName: assignee, assignedTo : assigneTo._id, description, category, status, resources, dueDate, priority, owner: _id, ownerName: owner.Name, priorityOptions, statusOptions, categoryOptions
  })

  const createdTask = await Task.findById(task._id)

  if(!createdTask){
    throw new ApiError(500, "Something went wrong while creating task")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, {createdTask}, "Task created"))
} )

const getTask = asyncHandler( async(req, res) => {

  const {id} = req.body

  const task = await Task.findOne({_id:id})

  return res
  .status(200)
  .json(new ApiResponse(200, task, "Task received"))

})

const getAllTask = asyncHandler( async(req, res) => {

  const allTasks = await Task.find()

  return res
  .status(200)
  .json(new ApiResponse(200, allTasks, "Task received"))

})

const getFilterdTasks = asyncHandler( async(req, res) => {

  const {owner, assignee, priority, category, status} = req.body

  const query = {};
  if (owner && owner !== "NA") query.ownerName = owner;
  if (assignee && assignee !== "NA") query.assigneeName = assignee;
  if (priority && priority !== "NA") query.priority = priority;
  if (category && category !== "NA") query.category = category;
  if (status && status !== "NA") query.status = status;

  const filterdTasks = await Task.find(query)

  return res
  .status(200)
  .json(new ApiResponse(200, filterdTasks, "Task received"))

})

const getMyTasks = asyncHandler( async(req, res)=>{

  const {_id} = req.user

  const mytasks = await Task.find({owner: _id})

  return res
  .status(200)
  .json(new ApiResponse(200, mytasks, "This is your tasks"))
} )

const assignedTasks = asyncHandler( async(req, res)=>{

  const {_id} = req.user

  const mytasks = await Task.find({assignedTo: _id})

  return res
  .status(200)
  .json(new ApiResponse(200, mytasks, "This is your tasks"))
} )

const updatepriority = asyncHandler( async(req, res) => {

  const {priority, taskID} = req.body

  const priorityOpt = ["Low", "Medium", "High", "Blocker"];
  const priorityOptions = priorityOpt.filter((option)=>{return option.toLocaleLowerCase() != priority.toLocaleLowerCase()})

  const task = await Task.findByIdAndUpdate(taskID, {priority, priorityOptions})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Priority update Successfully"))
} )

const updateCategory = asyncHandler( async(req, res) => {

  const {category, taskID} = req.body

  const categoryOpt = ["QA", "UI and UX", "Development", "Debugging"];
  const categoryOptions = categoryOpt.filter((option)=>{return option.toLocaleLowerCase() != category.toLocaleLowerCase()})

  const task = await Task.findByIdAndUpdate(taskID, {category, categoryOptions})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Category updated Successfully"))
} )

const updateStatus = asyncHandler( async(req, res) => {

  const {status, taskID} = req.body

  const statusOpt = ["New", "To do", "In Progress", "In Verification", "RFV", "Resolved", "Closed", "Re Opened",];
  const statusOptions = statusOpt.filter((option)=>{return option.toLocaleLowerCase() != status.toLocaleLowerCase()})

  const task = await Task.findByIdAndUpdate(taskID, {status, statusOptions})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Status Updated successfully"))
} )

const updateOwner = asyncHandler( async(req, res) => {

  const {owner, taskID} = req.body

  const user = await User.findOne({Name: owner});

  if (!user){
    throw new ApiError(404, "User doesn't exist!")
  }

  const task = await Task.findByIdAndUpdate(taskID, {ownerName: owner, owner: user._id})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }


  return res
  .status(200)
  .json(new ApiResponse(200, "Reporter Updated successfully"))
} )

const updateAssignee = asyncHandler( async(req, res) => {

  const {assignee, taskID} = req.body

  const user = await User.findOne({Name: assignee});

  if (!user){
    throw new ApiError(404, "User doesn't exist!")
  }

  const task = await Task.findByIdAndUpdate(taskID, {assigneeName: assignee, assignedTo: user._id})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Assignee Updated"))
} )

const updateTitle = asyncHandler( async(req, res) => {

  const {title, taskID} = req.body

  const task = await Task.findByIdAndUpdate(taskID, {title})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Title Updated"))
} )

const updateDescription = asyncHandler( async(req, res) => {

  const {description, taskID} = req.body

  const task = await Task.findByIdAndUpdate(taskID, {description})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }

  return res
  .status(200)
  .json(new ApiResponse(200, "Description Updated"))
} )

const updateResources = asyncHandler( async(req, res) => {

  const {resources, taskID} = req.body

  const task = await Task.findByIdAndUpdate(taskID, {resources})

  if (!task){
    throw new ApiError(404, "Task doesn't exit!") 
  }


  return res
  .status(200)
  .json(new ApiResponse(200, "Resources Updated"))
} )

const getFilterdTasksById = asyncHandler( async(req, res) => {

  const {_id} = req.user
  const {name} = req.body

  const filter = await SavedFilter.find({user: _id, name})

  if (!filter){
    throw new ApiError(404, "We don't have any filter")
  }

  const query = {};
  if (filter[0].owner && filter[0].owner !== "NA") query.ownerName = filter[0].owner;
  if (filter[0].assignee && filter[0].assignee !== "NA") query.assigneeName = filter[0].assignee;
  if (filter[0].priority && filter[0].priority !== "NA") query.priority = filter[0].priority;
  if (filter[0].category && filter[0].category !== "NA") query.category = filter[0].category;
  if (filter[0].status && filter[0].status !== "NA") query.status = filter[0].status;

  const filterdTasks = await Task.find(query)

  return res
  .status(200)
  .json(new ApiResponse(200, filterdTasks, "Task received"))

})


export {createTask, getTask, getAllTask, getFilterdTasks, getMyTasks, assignedTasks, updatepriority, updateCategory, updateStatus, updateOwner, updateAssignee, updateTitle, updateDescription, updateResources, getFilterdTasksById};