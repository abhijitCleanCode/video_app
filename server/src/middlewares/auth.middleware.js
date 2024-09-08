import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler( async (request, _, next) => {
    try {
        const token = request.cookies?.accessToken || request.header("Authorization")?.replace("Bearer ", "");

        console.log("auth.middleware :: token: ", token);

        if(!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Extract user from DB and remove password and refreshToken
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})