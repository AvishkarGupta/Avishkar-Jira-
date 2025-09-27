import { Schema, model } from "mongoose";
import { User } from "./user.model.js";


const savedFilterSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    owner:{
      type: String,
      required: true
    }, 
    assignee:{
      type: String,
      required: true
    }, 
    name:{
      type: String,
      required: true
    }, 
    priority:{
      type: String,
      required: true
    }, 
    category:{
      type: String,
      required: true
    }, 
    status:{
      type: String,
      required: true
    }
}, {timestamps: true})

export const SavedFilter = model("SavedFilter", savedFilterSchema)