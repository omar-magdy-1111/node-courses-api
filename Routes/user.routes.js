const express = require('express');
const multer = require('multer');
const { getAllUsers, getUser, updateUser, createUser, deleteUser, login } = require('../controllers/user.controllers');
const verifyToken = require('../utility/verifyToken');
const allowedTo = require('../utility/allow');
const bearer = require('../utility/bearer');
const { errHandle } = require('../utility/utility');
const router = express.Router();


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const { originalname, mimetype } = file;
        const [ type, ext ] = mimetype.split('/');
        const fileName = `${Date.now()}.${ext}`;
        if (type === 'image') {
         cb(null, fileName); 

        } else {
            console.log(fileName);
            cb(errHandle('Error', 404, `type of file is ${type}, this is not allow , must be image`), false);
        }
        
    }

});







const upload = multer({ storage: diskStorage });

router.route('/')
    .get(getAllUsers);


router.route('/register')
    .post(upload.single('avatar'), createUser);


router.route('/login')
    .post(login);


router.route('/:userID')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);


module.exports = router;