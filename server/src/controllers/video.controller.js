import {Video} from "../models/video.model.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const createVideo = asyncHandler(async (request, response) => {
    // Identify which user is creating the video. That is, video owner
    // Upload video on cloudinary
    // Get the video object and save it to DB

    // 1. Get the video owner
    const { _id: userID } = request.user;

    const { title, description, tags, visibility } = request.body;

    // 2. Upload video on cloudinary
    const videoLocalFilePath = request.files?.video[0].path;
    if (!videoLocalFilePath) {
        throw new ApiError(400, "Video is required");
    }

    let thumbnailImageLocalPath;
    if (request.files && Array.isArray(request.files.thumbnailImage) && request.files.thumbnailImage.length > 0) {
        thumbnailImageLocalPath = request.files.thumbnailImage[0].path
    }
    if (!thumbnailImageLocalPath) {
        throw new ApiError(400, "Video thumbnail is required");
    }

    const video = await uploadOnCloudinary(videoLocalFilePath);
    console.log("video :: cloudinary uploaded: ", video);
    const thumbnail = await uploadOnCloudinary(thumbnailImageLocalPath);
    console.log("thumbnail :: cloudinary uploaded: ", thumbnail);

    if (!video || !video.url) {
        throw new ApiError(500, "Failed to upload video to cloudinary");
    }
    if (!thumbnail || !thumbnail.url) {
        throw new ApiError(500, "Failed to video thumbnail to cloudinary");
    }

    // 3. Save video to DB
    const videoObj = new Video({
        videoFile: video.url,
        thumbnail: thumbnail.url,
        owner: userID,
        title,
        description,
        duration: video.width,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [], // Convert tags to array
        visibility: visibility || "public" // Default public if not specified
    })

    const savedVideo = await videoObj.save();

    const createdVideo = await Video.findById(savedVideo._id);
    if (!createdVideo) {
        throw ApiError(500, "Video creation failed");
    }

    return response.status(201).json(
        new ApiResponse(200, createdVideo, "Video uploaded Successfully")
    );
})

const getVideoById = asyncHandler(async (request, response) => {
    // Extract video ID
    // Find video from DB
    // Return video

    const { videoID } = request.params;
    // Validate that 'videoID' is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoID)) {
        throw new ApiError(400, "Invalid video ID format");
    }
    
    const video = await Video.findById(videoID);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    // For private videos only allowed user can view it
    /*if (video.visibility === "private" && video.owner.toString() !== request.user.id) {
        throw new ApiError(403, "You do not have permission to view this video");
    }*/

    // Consider using rate limiter here to prevent abuse

    video.views += 1;
    await video.save({ validateBeforeSave: false });

    return response.status(200).json(
        new ApiResponse(200, {...video}, "Video fetched Successfully!")
    );
})

const getAllVideo = asyncHandler(async (request, response) => {
    // Extract query params for pagination.
    const { page = 1, limit = 10, search } = request.query;

    const pageNum = Math.max(parseInt(page) || 1, 1);  // Ensure page is at least 1
    const limitNum = Math.max(parseInt(limit) || 10, 1); // Ensure limit is at least 1

    // Set up filter object
    let filter = {};

    // If search query is present, filter videos by title
    if (search && search.trim() !== '') {
        filter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        };
    }
    
    try {
        // Get the total number of videos that match the filter documents
        const total = await Video.countDocuments(filter);
        // Calculate the total number of pages based on the limit and total documents
        const totalPages = Math.ceil(total / limitNum);
        // Ensure the requested page is within bounds of the total number of pages
        const currentPage = Math.min(pageNum, totalPages);

        // Fetch videos with pagination, filtering
        const video = await Video.find(filter)
            .skip((currentPage - 1) * limitNum)
            .limit(limitNum);

        return response.status(200).json(
            new ApiResponse(200, { 
                video,
                currentPage,
                totalPages
            }, "Videos fetched successfully")
        )
    } catch (error) {
        return new ApiError(500, "Failed to fetch videos");
    }
})

const deleteVideoById = asyncHandler(async (request, response) => {
    const { videoID } = request.params;

    if (!mongoose.Types.ObjectId.isValid(videoID)) {
        return new ApiError(400, "Invalid video ID format");
    }

    const video = await Video.findById(videoID);
    if (!video) {
        return new ApiError(404, "Video not found");
    }

    // Check if logged in user is the owner of the video
    if (video.owner.id.toString() !== req.user.id) {
        return new ApiError(403, "You do not have the permission to delete this video");
    }

    // Delete the video from Cloudinary
    // Call a utility function to delete videos from Cloudinary
    // await deleteFromCloudinary(video.videoFile);

    await video.remove()

    return response.status(200).json(
        new ApiError(
            200,
            null,
            "Video deleted successfully"
        )
    )
})

const publishStatus = asyncHandler(async (request, response) => {

})

export {
    createVideo,
    getVideoById,
    getAllVideo,
    deleteVideoById,
    publishStatus,
}

// Potential safeguard measures
// for validation use a validator middleware, express-validator
// on getVideoById using express a rate limiter can be implemented to prevent abuse
// for large dataset optimize indexes for search, pagination, and sorting.
// to handle pagination queries with ease use pagination library like mongoose-paginate-v2