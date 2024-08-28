import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRECT
})

// Path of file locally save on server = localFilePath
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;

        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        console.log("Hurrah! file upload succed: ", response);

        // As the upload operation succed remove locally saved temporary file from server
        fs.unlinkSync(localFilePath) // sync bcz this operation is imp don't proceed further without completion

        return response;
    } catch (error) {
        // As the upload operation failed remove locally saved temporary file from server
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }