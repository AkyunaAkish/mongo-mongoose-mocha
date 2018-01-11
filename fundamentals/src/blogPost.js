const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Originally users had sub-document 'posts' 
// nested within them(that functionality was left alone for reference)
// But to have an easier time making a blog type
// application and referencing posts for a user
// and comments for a post and so forth
// this schema and the comment schema are being
// made to make future 'join esque' queries
// easier
const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [ { 
        type: Schema.Types.ObjectId, // references a type in another schema 
        ref: 'comment' // references the model that the ObjectId will belong to
    } ]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;

