import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({

    fullName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
 
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    profilePic: {
        type: String, // cloudinary url
        default: ""
    },
}, {

    timestamps: true
});

export const User = mongoose.model("User", UserSchema)