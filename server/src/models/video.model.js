import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    tags: {
        type: [String], // Array of tags to enhance search, filtering and data
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment", // Reference to Comment model
    }]
}, { timestamps: true })

videoSchema.plugin(mongoosePaginate);
videoSchema.index({ title: 'text', description: 'text' });

export const Video = mongoose.model("Video", videoSchema);