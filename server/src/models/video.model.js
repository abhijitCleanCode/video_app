import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String, // Cloudinary URL
        required: [true, "Video file is required in video schema"],
    },
    thumbnail: {
        type: String, // Cloudinary URL
        required: [true, "thumbnail is required in video schema"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "video title is required in video schema"],
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
        required: [true, "video duration is required in video schema"],
    },
    views: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })

export const Video = mongoose.model("Video", videoSchema);