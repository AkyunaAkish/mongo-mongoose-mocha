const assert = require('assert');

const User = require('../src/user');

describe('Sub-Documents', () => {
    it('Can create a sub-document', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [ { title: 'Post Title' } ] 
        });

        joe.save()
           .then(() => User.findOne({ name: 'Joe' }))
           .then((user) => {
                assert(user.posts[0].title === 'Post Title');
                done();
           });
    });

    it('Can add sub-documents to an existing document', (done) => {
        const joe = new User({
            name: 'Joe', 
            posts: []
        });

        joe.save()
           .then(() => User.findOne({ name: 'Joe' }))
           .then((user) => {
              user.posts.push({ title: 'New Post Title' }); 
              return user.save();
           })
           .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
               assert(user.posts[0].title === 'New Post Title');
               done();
           });
    });

    it('Can remove an existing sub-document', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [ { title: 'New Post Title' } ]
        });

        joe.save()
           .then(() => User.findOne({ name: 'Joe' }))
           .then((user) => {
               user.posts[0].remove(); // mongoose adds the remove method to each sub-document
               return user.save();
           })
           .then(() => User.findOne({ name: 'Joe' }))
           .then((user) => {
               assert(user.posts.length === 0);
               done();
           });
    });
});