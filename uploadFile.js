const multer = require('multer')

const upload = multer({
	dest: 'files/'
});

const uploadmiddleware = upload.single('myFile')

