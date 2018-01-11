const Artist = require('../models/artist');

module.exports = (_id) => Artist.findById(_id);
