import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllCommentsOnVideo = asyncHandler(async (request, response) => {
    
})

const createComment = asyncHandler(async (request, response) => {

})

const deleteComment = asyncHandler(async (request, response) => {

})

const updateComment = asyncHandler(async (request, response) => {

})


export {
    getAllCommentsOnVideo,
    createComment,
    deleteComment,
    updateComment
}