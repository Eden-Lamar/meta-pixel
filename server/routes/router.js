const express = require("express")
const multer = require('multer')
const exiftool = require("exiftool-vendored").exiftool


const router = express.Router();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname); // Save using the original filename
	}
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
	try {
		//GET EXIF Data
		const exifData = await exiftool.read(`uploads/${req.file.originalname}`)
		res.status(201).json({
			message: "EXIF Data processed successfully",
			filename: req.file.originalname,
			exifData
		})
	} catch (error) {
		res.status(500).json({
			message: 'Failed to processing image',
			error: `Error processing image: ${error}`
		})
	}
})

module.exports = router