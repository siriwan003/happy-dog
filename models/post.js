import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User',
        required: true
    },
    cagatorycommuID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cagatorycommu'
    },
    title:{
        type: String,
        required: [true, "titel required."],
        maxLenght: [150,"max 150 charater."]
    },
    content:{
        type: String,
        required: [true, "content required."],
        maxLenght: [1000,"max 1000 charater."]
    },
    imageurl:{
        type: String,
        default: null
    },
},{ timestamps: true })

export default mongoose.model("Post", postSchema)
