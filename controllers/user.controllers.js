const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const { errHandle, httpResponse } = require('../utility/utility');
const asyncWrapper = require('../middleware/middleware');
const tokenGenerator = require('../utility/generate.JWT');





// get all users
const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({}, { password: false, '__v': false });
    users ? res.status(200).json(httpResponse('success', users))
        : res.json(errHandle('Error', 401, 'something went wrong'));
});

// get one of users
const getUser = asyncWrapper(async (req, res,) => {
    const user = await User.findById(req.params.userID);
    !user ? res.json(errHandle('Error', 401, 'user not find'))
        : res.status(200).json(httpResponse('success', user));
});


// update user 
const updateUser = asyncWrapper(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userID, { $set: { ...req.body } });
    const updatedUser = await User.find({ _id: req.params.userID });
    updatedUser ? res.status(201).json(httpResponse('success', updatedUser))
        : res.json(errHandle('Error', 401, 'something went wrong'));

});


// delate user 
const deleteUser = asyncWrapper(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userID);
    user ? res.status(201).json(httpResponse('success', user))
        : res.json(errHandle('Error', 401, 'something went wrong'));
});

// register

const createUser = asyncWrapper(async (req, res, next) => {
    const { Fname, Lname, email, password, role } = req.body;
    const alreadyExist = await User.findOne({ email: email });
    if (alreadyExist) {
        const err = new Error('this user is already exist');
        return next(err);
    }
    const hashedPassword =await bcrypt.hash(password, 10);


    const user = new User({
        Fname, Lname, email, password: hashedPassword, role, avatar:req.file.filename
    });

    const token = tokenGenerator({ email: user.email, id: user._id, role });

    user.token = token;

    await user.save();





    return res.status(201).json(httpResponse('success', user));
});

//  login

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        const err = new Error('invalid email or password ');
        next(err);
    }
    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
        const err = new Error('user is not fond');
        return next(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            next(err);
        } else {

            const token = tokenGenerator({ email: user.email, id: user._id, role: user.role });
            res.status(200).json(httpResponse('Success', token));
        }

    });
});









module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    login,
    deleteUser
}






