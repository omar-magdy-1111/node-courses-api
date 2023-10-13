const { Schema, model } = require('mongoose');
const bearer = require('../utility/bearer');


const userSchema = new Schema({
    Fname: {
        type: String,
        required: true,
        min: [ 3, 'your first name should be at least 3 symbol' ],
        max: [ 12, 'your first name should be less than 12 symbol' ]
    },
    Lname: {
        type: String,
        required: true,
        min: [ 3, 'your last name should be at least 3 symbol' ],
        max: [ 3, 'your last name should be be less than 12 symbol' ],
    },
    email: {
        type: String,
        required: true,
        unique: [ true, 'this email already exists in our database' ],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ]
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(bearer), 
        default: bearer.USER,
    }, 
    avatar: {
        type: String,
        default:'upload/avatar.png'
    }



});
const User = model("User", userSchema);
module.exports = User; 