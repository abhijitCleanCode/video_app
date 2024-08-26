import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

export const User = mongoose.model("User", userSchema);