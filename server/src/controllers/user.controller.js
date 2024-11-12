import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token");
    }
}

const registerUser = asyncHandler( async (request, response) => {
    // get user details -> request.body
    // validation -> not empty, does user already exists
    // check for profile image
    // upload the image to cloud. Here using cloudinary
    // retrive the url from cloudinary
    // hash the password
    // create a user object and make an db entry
    // remove password and refresh token from response
    // verify wheather user got created successfully
    // return res

    const { username, email, password, fullName } = request.body;

    if ([username, email, password, fullName].some((field) => field.trim() === ""))
        throw new ApiError(400, "All fields are required")

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser)
        throw new ApiError(409, "User with same email or username already exist")

    console.log(request.files);

    const avatarLocalFilePath = request.file?.avatar[0]?.path;

    if (!avatarLocalFilePath)
        throw new ApiError(400, "Avatar file is required")

    const avatar = await uploadOnCloudinary(avatarLocalFilePath);
    console.log("Avatar, cloudinary object: ", avatar);

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar.url,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser)
        throw new ApiError(500, "User registration failed!")

    return response.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
} )

const loginUser = asyncHandler( async (request, response) => {
    // request body -> data
    // extract data (obj destrucring)
    // find the user from DB
    // password check
    // generate access and refresh token
    // send cookie

    const { email, password, username } = request.body;
    // cautions: don't trouble server if username and email is empty. use express-validator to check in between 
    if (!username && !email) {
        throw new ApiError(400, "username or email is required");
    }

    // find user from DB
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // verify password. user -> db instance created via User thus your define methods can be access using user 
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    // Don't send password or refreshToken to front-end
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // Make cookie secure, by defining options that allow cookie to be modified only by server
    const options = {
        httpOnly: true,
        secure: true,
    }

    return response
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToke", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully!"
            )
        )

} )

const logoutUser = asyncHandler( async (request, response) => {
    // get the target user data -> request.body
    // validation, not empty
    // find the target user from DB
    // logout the user if exist, otherwise throw error

    const { _id: userID } = request.body;
    // Skipped validation
    await User.findByIdAndUpdate(
        userID,
        {
            $unset: {
                refreshToken: 1 // doing this will remove field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return response
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (request, response) => {
    // get the incomming refresh token from cookie
    // decode the token
    // validate the refresh token, used or expired
    // validate, refresh token expired or used
    // generate new token and saved

    const incommingRefreshToken = request.cookies.refreshToken || request.body.refreshToken;

    if (!incommingRefreshToken)
        throw new ApiError(401, "Unauthorized access")

    try {
        // synchronous verification happen so no await
        const decodeToken = jwt.verify(incommingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodeToken._id);
        if (!user)
            throw new ApiError(401, "Unauthorized access")

        // match the token
        if (incommingRefreshToken != user?.refreshToken)
            throw new ApiError(401, "Refresh token expired or used")

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return response
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(200, 
                    {accessToken, refreshToken: newRefreshToken}, 
                    "Access token refreshed")
            )
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandler(async (request, response) => {
    // middleware will check user is authenticated
    // get the new password from request.body
    // find the user in DB
    // update the password in DB and save the user

    const { newPassword } = request.body;
    const { _id: userID } = request.user;

    const user = await User.findById(userID)

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return response
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUser = asyncHandler( async (request, response) => {
    const { _id: userID } = request.user;
    const user = await User.findById(userID).select("-password -refreshToken");
    return response
        .status(200)
        .json(new ApiResponse(200, { user }, "User retrieved successfully"))
})

const updateUserAvatar = asyncHandler( async (request, response) => {
    // fetch the target user form DB
    // fetch the image from request.files
    // apply validation, check if image exist
    // upload image to cloudinary

    const { _id: userID } = request.user;
    const avatarLocalFilePath = request.file?.path;
    if (!avatarLocalFilePath)
        throw new ApiError(400, "Avatar is required");

    const avatar = await uploadOnCloudinary(avatarLocalFilePath);
    if (!avatar)
        throw new ApiError(500, "Something went wrong while uploading image");

    const user = await User.findByIdAndUpdate(
        userID,
        {
            avatar: avatar.url
        },
        {
            new: true
        }
    ).select("-password")

    return response
        .status(200)
        .json(new ApiResponse(200, user, "User avatar updated successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateUserAvatar,
}