// greeting() {} within an object is the 
// es6 equivalent of greeting: function() {}
module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    }
};