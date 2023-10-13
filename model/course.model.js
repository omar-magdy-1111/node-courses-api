const { Schema, model } = require('mongoose');


const courseSchema =new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const Course = model("Course", courseSchema);
module.exports=Course 