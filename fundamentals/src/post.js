// post schema file
// technically not a model file
// before posts will be nested inside of users
// as "sub-documents"
// and will not be a stand-alone collection in mongo
// such as users is

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String
});

module.exports = PostSchema;