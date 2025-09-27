import mongoose, {Schema, model} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const  UserSchema = new Schema({
  empId:{
    type: Number,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    required: true
  },
  reportesTo:{
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createdTask:{
    type: Schema.Types.ObjectId,
    ref: "Task" 
  },
  task:{
    type: Schema.Types.ObjectId,
    ref: "Task" 
  },
  role:{
    type: String,
    // emu
  },
  refreshToken:{
    type: String
  },
  managerName:{
    type: String
  }

}, {timestamps:true})

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    // next()
  }
});

UserSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}


UserSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    empId: this.empId
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}
UserSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id :this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User = model("User", UserSchema)