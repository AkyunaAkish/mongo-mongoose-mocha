// User model definition file
// -------------------------- 
const mongoose = require('mongoose');

// part of mongoose that lets you 
// define a schema
const Schema = mongoose.Schema;

const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String, // each user in the user collection will have a property 'name' of type string
        required: [ true, 'Name is required.' ],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        }
    }, 
    likes: Number,
    posts: [ PostSchema ], // mongoose will assume this is an array of sub-documents of type PostSchema
    blogPosts: [ {
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    } ]
});

// the meaning of 'this' needs to be maintained properly
// so a regular function needs to be used instead of a 
// fat arrow function
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

// schema.pre or schema.post is a way of creating middleware
// for database transactions, such as cascading deletions to
// dependent data
// -----------------------------------------------------
// the meaning of 'this' needs to be maintained properly
// so a regular function needs to be used instead of a 
// fat arrow function
UserSchema.pre('remove', function(next) {
    // loading blogPost model here so that
    // whenever the function runs, the newest version
    // of the blogPost model will be referenced
    const BlogPost = mongoose.model('blogPost');
    
    const Comment = mongoose.model('comment');

    // the update operator $in
    // allows one database transaction
    // to be iterative and for example delete
    // every blog post that has an id
    // within the user.blogPosts array
    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());
    
});

// Applies the UserSchema to a model
// named 'user'. 'User' represents the 
// entire collection of users in the
// connected mongo database using this model
const User = mongoose.model('user', UserSchema);

module.exports = User;
