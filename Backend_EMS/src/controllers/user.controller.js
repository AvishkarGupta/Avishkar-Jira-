import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshToken =  async (userId)=>{
  try {
    const user = await User.findById(userId)
    const refreshToken = await user.generateRefreshToken()
    const accessToken = await user.generateAccessToken()
    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went worng while generating tokens", error)
  }
}

const registerUser = asyncHandler(async (req, res) => {

  const { Name, empId, firstName, lastName, email, password, dateOfBirth, dateOfJoining, role, reportesTo } = req.body

  if ([empId, Name, firstName, lastName, email, password, dateOfBirth, dateOfJoining, role, reportesTo].some((fileds) => fileds?.trim === "")) {
    throw new ApiError(401, "All fields are required")
  }

  const existedUser = await User.findOne({ $or: [{ empId }, { email }] })
  if (existedUser) {
    throw new ApiError(400, "User email and empId already exist in our database")
  }
  
  const reportingManager = await User.findOne({Name: reportesTo, $options: "i" })
  if (!reportingManager) {
    throw new ApiError (400, "Unable to find Reporing Manager in dataBase.")
  }
  
  const avatarLocalPath = req.files?.avatar[0]?.path
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }
  const avatar1 = await uploadOnCloudinary(avatarLocalPath)
  const user = await User.create({
    Name,
    empId,
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    dateOfJoining,
    role,
    avatar: avatar1,
    managerName: reportesTo,
    reportesTo :reportingManager._id
  })
  const createdUser = await User.findById(user?._id).select("-password -refreshToken")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, createdUser, "User created successfully"))
})

const loginUser = asyncHandler( async(req, res)=>{
  const {email, password} = req.body

  console.log("user login request received")

  if (!email | !password){
    throw new ApiError(401, "Email and password required")
  }

  const user = await User.findOne({email})

  if (!user){
    throw new ApiError(401, "Invalid user credentials")
  }

  const isVaidPassword = await user.isPasswordCorrect(password)

  if(!isVaidPassword){
    throw new ApiError(401, "Invalid user credentials")
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password")

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json (new ApiResponse(200, loggedInUser, "User logged in successfully"))
})

const logoutUser = asyncHandler( async(req, res)=>{
  await User.findByIdAndUpdate(req.user._id, {$set:{refreshToken: undefined}}, {new: true})

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User Logged Out"))
} )

const getAllProfiles = asyncHandler( async(req, res) => {

  const profiles = await User.find().select("-password, -refershToken")

  return res
  .status(200)
  .json(new ApiResponse(200, profiles, "All users profile"))
} )

const editUserAvatar = asyncHandler( async(req, res) =>{

  const {_id} = req.user
  // const {Name} = req.body

  // console.log(_id, Name)

  // if (Name === "") console.log("Name is empty")

  const avatarLocalPath = await req.files?.avatar[0]?.path
  
  if (!avatarLocalPath){
    throw new ApiError(400, "Avatar is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  console.log(avatar)
  const user = await User.findByIdAndUpdate(_id, {avatar}, {new:true})

  return res
  .status(200)
  .json(new ApiResponse(200, user, "Profile Updated"))
})

const editUserName = asyncHandler( async( req, res) =>{

  const {_id} = req.user
  const {name} = req.body

  if (!name){
    throw new ApiError(400, "New user name is required.")
  }

  const user = await User.findByIdAndUpdate(_id, {Name: name}, {new:true}).select("-password")

  if (!user){
    throw new ApiError(500, "Something went wrong while update user data")
  }

  return res
  .status(200)
  .json(new ApiResponse(200, user, "User name updated"))
})


export { registerUser, loginUser, logoutUser, getAllProfiles, editUserAvatar,editUserName };