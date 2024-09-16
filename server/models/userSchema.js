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
        default: ""
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