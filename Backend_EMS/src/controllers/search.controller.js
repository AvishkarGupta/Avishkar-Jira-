import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const searchData = asyncHandler( async(req, res) => {

  const {query} = req.params

  console.log(query )
  const userData = await User.find({Name: {$regex: query, $options: "i" } })
  const taskData = await Task.find({title: {$regex: query, $options: "i" } })

  const data = [...userData, ...taskData]

  return res
  .status(200)
  .json(new ApiResponse(200, data, "Here is your data"))
})



export {searchData};