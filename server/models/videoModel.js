let mongoose = require('mongoose');

let videoSchema = new mongoose.Schema({
    title:String,
    videoUrl:String,
    imageUrl:String,
    description:String
})

let Video = new mongoose.model('Video',videoSchema)
module.exports = Video;