import path from 'path'
import express from 'express'
import multer from 'multer'
import { s3Upload } from '../middleware/s3Service.js'
const router = express.Router()

const storage = multer.memoryStorage()

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//upload img, update img , and delete img
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const result = await s3Upload(req.file)
    res.json(result)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    })
  }
})

export default router
