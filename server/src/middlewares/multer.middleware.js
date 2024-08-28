import multer from "multer";

// Boiler plate code
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
})

export const upload = multer({ 
    storage, 
})

// There are two types of storage: diskStorage and memory Storage
// disk storage = larger file