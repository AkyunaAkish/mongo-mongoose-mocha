const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'JS pwns the newbz', content: 'Yup it does.' });

        // mongoose will see that you pushed in/set
        // an entire model instance,
        // and will realize that you probably want to 
        // just reference the ObjectId, and will just add that
        // for you
        joe.blogPosts.push(blogPost);

        Promise.all([ joe.save(), blogPost.save() ])
               .then(() => done())
               .catch(() => done());
    });

    it('User removal causes blogPost remove cascade', (done) => {
        joe.remove()
           .then(() => BlogPost.count())
           .then((blogPostCount) => {
                assert(blogPostCount === 0);
                done();
           });
    });
});