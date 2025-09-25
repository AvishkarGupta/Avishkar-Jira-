import mongoose, {Schema, model} from "mongoose";

const taskSchema = new Schema({
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  ownerName:{
    type: String,
    required: true
  },
  assignedTo:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  assigneeName:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String
  },
  category:{
    type: String, 
    required: true
  },
  status:{
    type: String,
    default: "Open", //emu
  },
  resources:{
    type: String,
    default: "Don't have any resources."
  },
  priority:{
    type: String,
    default: "Medium" //emu
  },
  dueDate:{
    type: String,
    default: "Not specified"
  },
  priorityOptions:{
    type: Array,
    // default: "New"
  },
  statusOptions:{
    type: Array,
    // default: "New"
  },
  categoryOptions:{
    type: Array,
    // default: "New"
  },
  comment: [
    {
      content: {
        type: String
      },
      commentPosterID: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      posterAvatar: {
        type: String,
        default: ""
      },
      posterName: {
        type: String,
        default: "exampleUserName"
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    }
  ]

}, {timestamps: true})


export const Task = mongoose.model("Task", taskSchema)