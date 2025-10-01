import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"


export const verifyjwt =  asyncHandler( async (req, res, next)=>{
  try {
    // const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");
    // const token1 = req.cookies?.accessToken
    const token1 = req?.headers["authorization"]?.replace("Bearer ", "") || req?.cookies?.accessToken
    if (!token1){
      throw new ApiError(402, "Unable to excrate token from headers.")
    }
    console.log("logout",token1)

    let decodedToken = "";

    if (req.cookies.accessToken){
      decodedToken = jwt.verify(token1, process.env.ACCESS_TOKEN_SECRET);

    }else{
      decodedToken = jwt.verify(token1, process.env.REFRESH_TOKEN_SECRET);  
      
    }

    // const decodedToken = jwt.verify(token1, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken._id).select("-password -refreshToken")

    if(!user){
      throw new ApiError(401, "Invalid Refersh Token")
    }

    req.user = user
    console.log("User Verified")
    next()

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid JWT Token")
  }
})

