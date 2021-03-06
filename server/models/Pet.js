const mongoose = require('mongoose')
    //values, validation, required, default value
const default_image = "https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_960_720.jpg"

const petScheme = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    img: {
        type: String,
        required: true,
        validate: /^https?/,
        default: default_image,
        set(value) { return default_image }
    },
    image: {
        type: Buffer,
        contentType: String,
    },
    breed: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true, maxlength: 150 },
    owner : {type: mongoose.Types.ObjectId,
        ref: "User"
        }
});

module.exports = mongoose.model('Pet', petScheme)