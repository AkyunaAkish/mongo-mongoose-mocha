const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

const assert = require('assert');

describe('Associations', () => {
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS pwns the newbz', content: 'Yup it does.' });
        comment = new Comment({ content: 'I agree, it does PWN the newbz, hard.' });
        
        // mongoose will see that you pushed in/set
        // an entire model instance,
        // and will realize that you probably want to 
        // just reference the ObjectId, and will just add that
        // for you
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([ joe.save(), blogPost.save(), comment.save() ])
               .then(() => done())
               .catch(() => done());
    });
    
    // can use it.only to only run one test at a time
    it('Saves a relation between a user and a blogPost', (done) => {
        // In the user model/schema
        // there is a sub-document collection 
        // of blogPost ObjectIds,
        // using the populate() mongoose query modifier,
        // that sub-document collection will be returned to
        // actually of the blogPost objects in the 
        // user.blogPosts property rather than just the blogPost
        // ObjectIds
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then((user) => { 
                // blogPosts will be populated,
                // but blogPost comments will not be,
                // you have to do an additional populate for that
                assert(user.blogPosts[0].title === 'JS pwns the newbz');
                done();
            });
    });

    it('Saves a full relation tree(users -> blogPosts -> comments)', (done) => {
        // by passing an object to the populate query modifier
        // you can define how deeply you want to populate
        // the collections of ids each of your models
        // has.
        // Be careful though because if you do this without
        // defining pagination/limits you can crash the server
        // by loading too much data at once
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS pwns the newbz');
                assert(user.blogPosts[0].comments[0].content === 'I agree, it does PWN the newbz, hard.');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});