import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required in user schema"]
    },
    username: {
        type: String,
        required: [true, "user name is required in user schema"],
        unique: [true, "user name must be unique"],
        index: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required in user schema"],
        unique: [true, "email must be unique"],
    },
    password: {
        type: String,
        required: [true, "password is required in user schema"],
    },
    refreshToken: {
        type: String
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    avatar: {
        type: String, // Cloudinary URL
        required: [true, "Avatar is required"]
    },
    coverImage: {
        type: String, // Cloudinary URL
    }
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next();

    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema);