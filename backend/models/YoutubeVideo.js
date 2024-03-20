const mongoose = require('mongoose')

const youTubeVideoSchema = new mongoose.Schema({
    title : {
        type: String ,
        required: true
    },
    description:{
        type : String ,
        required : true
    },
    tags :{
        type : [String]
    },
    url :{
        type : String
    }
});
module.exports = mongoose.model('YoutubeVideo', youTubeVideoSchema)
