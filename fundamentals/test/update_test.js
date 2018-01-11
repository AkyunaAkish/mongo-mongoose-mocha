const assert = require('assert');

const User = require('../src/user');

describe('Updates a document/documents in a collection', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });

        joe.save()
           .then(() => done());
    });

    function assertName(operation, done) {
        operation.then(() => User.find({}))
                 .then((users) => {
                     assert(users.length === 1);
                     assert(users[0].name === 'Alex');
                     done();
                 });
    }

    it('instance type using set and save', (done) => {
        // set and save allows you to save at a certain point
        // rather than saving the changes to the user immediately
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('A model instance can update', (done) => {
        // update will run set and save
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('A model class can update', (done) => {
        // updates all documents with a name of Joe
        // and replaces with Alex        
        assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('A model class can update one record', (done) => {
        // this will update the first found user with the 
        // name of Joe and replace with Alex
        assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
    });

    it('A model class can find a record with and id and then update', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
    });

    it('A model class can update specific users\'s likes to increment by 1', (done) => {
        // update operators for updating many records at a time: 
        // https://docs.mongodb.com/manual/reference/operator/update/

        // to decrement you can increment by a negative number { $inc: { likes: -1 }

        User.update({ name: 'Joe' }, { $inc: { likes: 1 } } )
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    });
});