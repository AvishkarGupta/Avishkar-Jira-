import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import { Task } from "../models/task.model.js";
import { SavedFilter } from "../models/savedFilters.model.js";

const saveFilter = asyncHandler( async(req, res) =>{

  const {_id} = req.user
  const {owner, assignee, name, priority, category, status} = req.body

  if (!name ){
    throw new ApiError(400, "Filter name is required")
  }

  const existFilter = await SavedFilter.findOne({user: _id, name})

  if (existFilter){
    throw new ApiError(404, `Filter already exist with ${name} name`)
  }

  const filter = await SavedFilter.create({
    user: _id, owner, assignee, name, priority, category, status
  })

  if (!filter){
    throw new ApiError(500, "Something went wrong while creating filter")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, filter, "Filter Saved"))
} )

const getMyFilters = asyncHandler( async(req, res) => {

  const {_id} = req.user

  const filters = await SavedFilter.find({user: _id})
  
  if (!filters){
    throw new ApiError(404, "User doesn't have any saved filters.")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, filters, "User filters"))
} )

const deleteFilter = asyncHandler( async(req, res) =>{
  const {_id} = req.user
  const {filterName} = req.body

  if (!filterName || !_id){
    throw new ApiError(404, "Filter name and user id is required.")
  }

  const deletedFilter = await SavedFilter.findOneAndDelete({user: _id, name: filterName})

  if(!deleteFilter){
    throw new ApiError(500, "Something went wrong while delete filter")
  }

  const filters = await SavedFilter.find({user: _id})

  return res
  .status(200)
  .json(new ApiResponse(200, filters, "Filter deleted"))
} )

export {saveFilter, getMyFilters, deleteFilter};