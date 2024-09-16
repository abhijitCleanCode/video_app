import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Playlist name is required'],
        trim: true, // Remove whitespace from name
        minlength: [3, 'Playlist name must be at least 3 characters'],
        maxlength: [100, 'Playlist name must be less than 100 characters']
    },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Owner is required'],
        index: true // Index to optimize search by owner
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Ensure the combination of owner and name is unique (for unique playlist names per user)
playlistSchema.index({ owner: 1, name: 1 }, { unique: true });

export const Playlist = mongoose.model("Playlist", playlistSchema);