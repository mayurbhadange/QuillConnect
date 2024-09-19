const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        default : ""
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    profilePicture:{
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/sharefun-dc053.appspot.com/o/media%2Fimages%2FdefaultProfilePicture.jpg?alt=media&token=657fb254-8e45-443c-b791-e1e67b38edae"
    },
    coverPicture : {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/sharefun-dc053.appspot.com/o/media%2Fimages%2FdefaultCoverPicture.jpg?alt=media&token=b68f8668-060e-4231-8f7a-8818183eb9b3"
    },
    location : {
        type: String,
        default: ""
    },
    bio:{
        type: String,
        default: ""
    },

},
{timestamps: true})

module.exports = mongoose.model('User', userSchema);