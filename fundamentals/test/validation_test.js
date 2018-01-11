const assert = require('assert');

const User = require('../src/user');

describe('Validating records', () => {
    it('Requires a name', () => {
        const user = new User({ name: undefined });

        // a synchronous version of the validate 
        // method(which would be called with a callback function to get a response)
        const validationResult = user.validateSync(); // returns an error object
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.');
    });

    it('Requires a name greater than 2 characters', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync(); // returns an error object
        const { message } = validationResult.errors.name;
        
        assert(message === 'Name must be longer than 2 characters.');
    });

    it('Disallows invalid records from being saved', (done) => {
        const user = new User({ name: 'Al' });

        user.save()
            .then(() => done())
            .catch((err) => {
                const { message } = err.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
    });
});