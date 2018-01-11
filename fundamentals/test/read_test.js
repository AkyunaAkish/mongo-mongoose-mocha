const assert = require('assert');

const User = require('../src/user');

describe('Read users out of database', () => {
    let joe, maria, alex, zack;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        alex = new User({ name: 'Alex' });
        maria = new User({ name: 'Maria' });
        zack = new User({ name: 'Zack' });

        Promise.all([ 
                      joe.save(), 
                      alex.save(), 
                      maria.save(), 
                      zack.save() 
                    ])
               .then(() => done());
    });

    it('Finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                // _id is actually an object
                // so you need to call toString
                // to be able to compare the actual
                // _id string values
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Finds a user with a particular _id', (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {                
                assert(user._id.toString() === joe._id.toString());
                assert(user.name === 'Joe');
                done();
            });
    });

    it('Can skip and limit a result set', (done) => {
        User.find({})
            .sort({ name: 1 }) // 1 means least to greatest, -1 is greatest to least
            .skip(1)
            .limit(2)
            .then((users) => {
                // because of sort,
                // joe will be second
                // maria will be third
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                assert(users.length === 2);
                done();
            }); 
    });
});