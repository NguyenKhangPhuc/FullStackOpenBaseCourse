const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    author: String,
    url: {
        type: String,
        require: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const blog = mongoose.model('Blog', blogSchema)
module.exports = blog