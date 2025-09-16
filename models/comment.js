import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    content:{
        type: String,
        required: [true, "content required."],
        maxlength: [1000,"max 1000 characters."]
    }, 
    imageurl:{
        type: String,
        default: null
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })  

export default mongoose.model("Comment", commentSchema)
