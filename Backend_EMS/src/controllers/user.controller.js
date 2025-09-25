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
  //get user data
  //valid not empty
  //check if user exist emp id and email
  // check for image
  //upload to cloudinary
  //create user object - create db entry
  //remove pass and refresh token from res
  //check for user creation
  //return response if successfully uer created else error

  // const {email, password} = req.params
  const { Name, empId, firstName, lastName, email, password, dateOfBirth, dateOfJoining, role, reportesTo } = req.body

  if ([empId, Name, firstName, lastName, email, password, dateOfBirth, dateOfJoining, role, reportesTo].some((fileds) => fileds?.trim === "")) {
    throw new ApiError(401, "All fields are required")
  }

  const existedUser = await User.findOne({ $or: [{ empId }, { email }] })
  if (existedUser) {
    throw new ApiError(400, "User email and empId already exist in our database")
  }
  
  const reportingManager = await User.findOne({Name: reportesTo})
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

  return res.status(200).json(new ApiResponse(200, createdUser, "User created successfully"))
})

const loginUser = asyncHandler( async(req, res)=>{
  const {email, password} = req.body

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

  const loggedInUser = await User.findById(user._id).select("-password -refershToken")

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

  const profiles = await User.find()

  return res
  .status(200)
  .json(new ApiResponse(200, profiles, "All users profile"))
} )


export { registerUser, loginUser, logoutUser, getAllProfiles };