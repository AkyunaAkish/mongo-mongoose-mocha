const mongoose = require('mongoose');

// this will tell mongodb
// which promise implementation to 
// use. Such as ES6 Promises or bluebird
// in this case ES6 Promises
mongoose.Promise = global.Promise;

// Mocha will run this one
// time before ALL tests run
before(() => {
    // Even if the users_test DB hasn't been defined yet,
    // Mongoose and MongoDB will work together to make sure that
    // DB is created upon first connection. 
    mongoose.connect('mongodb://localhost/users_test');

    mongoose.connection
            .once('open', () => console.log('Connected to MongoDB via Mongoose'))
            .on('error', (error) => {
                console.warn('Warning: ', error);
            });
});

// Mocha will run this before
// each test in other files 
// within the project test directory
beforeEach((done) => {
    // mongoose lowercases names hence 'blogposts'
    const { users, comments, blogposts } = mongoose.connection.collections;

    users.drop(() => {
        // when drop is finished
        // it will call this cb
        // and then run the mocha
        // provided done() function
        // which is needed in order
        // for mocha to wait until the 
        // async drop method has finished
        // running
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});