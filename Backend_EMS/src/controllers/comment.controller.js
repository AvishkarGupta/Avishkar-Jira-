import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const addComment = asyncHandler( async(req, res) => {

  const { _id} = req.user
  const { comment, taskID} = req.body

  const user = await User.findById(_id)

  if(!user){
    throw new ApiError(404, "Usernot found");
  }

  // const cmt = await Task.

  const newComment = await Task.findByIdAndUpdate(taskID,{
    $push:{
      comment: {
        content : comment,
        commentPoster: _id,
        posterAvatar: user.avatar, 
        posterName: user.Name
      }
    }}, {new:true})

  if (!newComment){
    throw new ApiError(500, "Unable to add comment")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, newComment, "Comment added Succesfully"))
})

const deleteComment = asyncHandler( async(req, res) => {

  const {taskID, commentID} = req.body

  const task = await Task.findByIdAndUpdate(taskID, {$pull:{comment: {
    _id: commentID
  }}}, {new:true})

  if (!task){
    throw new ApiError(404, "Something went wrong while deleting comment")
  }

  res
  .status(200)
  .json(new ApiResponse(200, task, "Comment Delete"))
})

const editComment = asyncHandler( async(req, res) => {

  const {taskID, commentID, content} = req.body

  const task = await Task.findOneAndUpdate({
    _id: taskID, 
    "comment._id": commentID }, {$set: {"comment.$.content": content}}, {new:true}
  )

  if(!task){
    throw new (ApiError(404, "Some went wrong while editing comment"))
  }


  res
  .status(200)
  .json(new ApiResponse(200, task, "Comment edited"))
})

export {addComment, deleteComment, editComment}; 