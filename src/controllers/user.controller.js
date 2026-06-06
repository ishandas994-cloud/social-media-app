import { asyncHandler } from "../utils/asyncHandler.js";

const registeruser = asyncHandler(async (req, res) => {
    const{username,email,fullname,password}=req.body
    console.log("email: ",email);
});

export { registeruser };