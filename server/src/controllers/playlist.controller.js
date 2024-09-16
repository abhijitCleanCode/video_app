import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (request, response) => {

})

const getPlaylistById = asyncHandler(async (request, response) => {
    
})

const addVideoToPlaylist = asyncHandler(async (request, response) => {

})

const removeVideoFromPlaylist = asyncHandler(async (request, response) => {

})

const deletePlaylist = asyncHandler(async (request, response) => {

})

const updatePlaylist = asyncHandler(async (request, response) => {

})

export {
    createPlaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}