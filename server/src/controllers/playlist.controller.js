import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (request, response) => {
    const { name, visibility = "public", videos = [] } = request.body;
    const { _id: userID } = request.user;

    // Ensure required fields are present
    if (!name)
        throw new ApiError(400, "Playlist name is required");

    // Avoid adding duplicates elements to playlist
    const uniqueVideos = [...new Set(videos)];

    // Create the new playlist
    const playlist = new Playlist({
        name,
        visibility,
        owner: userID,
        videos: uniqueVideos,
    })

    // Save the playlist to DB
    try {
        await playlist.save();
        return response.status(201).json(
            new ApiResponse(200, playlist, "Playlist created successfully")
        );
    } catch (error) {
        // Handle unique constrains error
        if (error.code === 11000) {
            return response.status(400).json(
                new ApiError(400, "Playlist with this name already exist")
            )
        }

        // Handle any other server side errors
        throw error;
    }
})

const getPlaylistById = asyncHandler(async (request, response) => {
    const { playlistID } = request.params;
    if (!mongoose.Types.ObjectId.isValid(playlistID)) {
        throw new ApiError(400, "Invalid Playlist ID");
    }

    // Fetch the playlist from DB
    const playlist = await Playlist.findById(playlistID)
        .populate('videos');

    // Check is playlist exist
    if (!playlist)
        throw new ApiError(404, "Playlist not found")

    // Check if person is authorized to view playlist

    return response.status(200).json(
        new ApiResponse(200, playlist)
    )
})

const addVideoToPlaylist = asyncHandler(async (request, response) => {
    // Get the target playList ID to add videos
    // Get the video to be added
    // Fetch the playlist using ID from DB
    // Check for duplicacy
    // Add video to playlist

    const { _id: userID } = request.user;

    const { playlistID } = request.params;
    const { videoID } = request.body;
    if (!mongoose.Types.ObjectId.isValid(playlistID) || !mongoose.Types.ObjectId.isValid(videoID))
        throw new ApiError(400, "Invalid playlist or video ID")

    // Fetch the playlist
    const playlist = Playlist.findById(playlistID);
    // Check if playlist exist
    if (!playlist)
        throw new ApiError(404, "Playlist not found");

    // Security check: only playlist owner can add videos
    if (playlist.owner.toString() !== userID.toString())
        throw new ApiError(403, "You do not have the permission to add videos");

    // Check for duplicacy
    if (playlist.videos.includes(videoID))
        throw new ApiError(400, "Video is already in the playlist")

    // Add video to playlist
    playlist.videos.push(videoID);
    playlist.save()

    return response.status(200).json(
        new ApiResponse(200, "Video added to the playlist successfully!")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (request, response) => {
    const { _id: userID } = request.user;

    const { playlistID } = request.params;
    const { videoID } = request.video;
    if (!mongoose.Types.ObjectId.isValid(playlistID) || !mongoose.Types.ObjectId.isValid(videoID))
        throw new ApiError(400, "Invalid playlist or video ID")

    const playlist = await Playlist.findById(playlistID);
    if (!playlist)
        throw new ApiError(404, "Playlist not found.")

    if (!playlist.videos.includes(videoID))
        throw new ApiError(400, "Video does not exits.")

    // Security check: user is authorised to remove video
    if (playlist.owner.toString() !== userID.toString())
        throw new ApiError(403, "You do not have the permission to remove videos");

    playlist.videos = playlist.videos.filter((id) => id.toString() !== videoID); // Try adding toString to videoID
    await playlist.save()

    return response.status(200).json(
        new ApiResponse(200, playlist, "Video remove from playlist successfully!")
    )
})

const deletePlaylist = asyncHandler(async (request, response) => {
    const { _id: userID } = request.user;
    const { playlistID } = request.body;
    if (!mongoose.Types.ObjectId.isValid(playlistID))
        throw new ApiError(400, "Invalid playlist ID");

    const playlist = await Playlist.findById(playlistID);
    if (!playlist)
        throw new ApiError(404, "Playlist not found.")

    // Security check: user is authorised to delete playlist
    if (playlist.owner.toString() !== userID.toString())
        throw new ApiError(403, "You do not have the permission to delete playlist");

    await Playlist.findByIdAndDelete(playlistID);

    return response.status(200).json(
        new ApiResponse(200, "Playlist deleted successfully!")
    );
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

/*
Set is a build in JS object that allows only unique element
new Set(videos) convert videos array to set thereby filtering out duplicate elements
...(spread operator) convert set back to array
*/