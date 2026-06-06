import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { uploadResult } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registeruser = asyncHandler(async (req, res) => {
    const { username, email, fullname, password } = req.body
    console.log("email: ", email);

    if (
        [fullname, email, password, username].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "all firld is required:");
    }
    const existeduser = User.findOne({
        $or: [{ email }, { username }]
    })
    if (existeduser) {
        throw new ApiError(409, "user with  this username and email is already exist! ");
    }

    const localpath = req.files?.avatar[0]?.path;
    const localimagepath = req.files?.coverImage[0]?.path;

    if (!localpath) {
        throw new ApiError(409, "avater file is must required:");
    }
    const avatar=await uploadonCloudnary(localpath)
    const coverImage =await uploadonCloudnary(localimagepath)

    if(!avatar){
        throw new ApiError (409,"avater must required:");
    }
     const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowercase()
    })

  const createuser = await  User.findById(user._id).select(
    "-password -refracetoken"
  )

  if(!createuser){
    throw new ApiError (500,"some servererror is coming :");
  }
  return res.status(201).json(
    new ApiResponse(200,createuser,"user registered succesfully:")
  )

});

export { registeruser };