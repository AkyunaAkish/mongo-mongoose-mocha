// assert module was automatically 
// installed by mocha
const assert = require('assert'); 

// reference to user Model 
// aka collection of users in DB
const User = require('../src/user'); 

describe('Creating mongodb records', () => {
   it('saves a user', (done) => {
       const joe = new User({ name: 'Joe' });
    
       // Insert joe into mongodb
       joe.save()
          .then((savedUser) => {
            // if joe has finished being
            // inserted into the db
            // isNew will be false
            assert(!savedUser.isNew);

            // needed for mocha to wait 
            // for async 
            // calls to finish before 
            // moving onto next test
            done(); 
          });
   }); 
});