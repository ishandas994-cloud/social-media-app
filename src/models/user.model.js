import mongoose, { Schema } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true,
        trim: true
    }, email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    }, fullname: {
        type: String,
        required: true,
        trim: true
    }, avater: {
        type: String,
        required: true
    }, coverimage: {
        type: String,
    }, watchhistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refracetoken: {
        type: String
    }
}, {
    timestamps: true
}
)

userSchema.pre("save",async function(next) {
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,8)
    next()
})

userSchema.methods.isPasswordCorrect =async function(password) {
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function(){
  return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefraceToken=function(){
    return  jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.fullname,
        fullname:this.fullname
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const user = mongoose.model("user", userSchema)