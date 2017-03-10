// grab the things we need
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var Constant = require('../helpers/Constant');
// create a schema
var schema = new Schema({
  fname: String,
  lname: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: Number,
  created_at: Date,
  updated_at: Date
}, { strict: false });

// adding static methods to the Model
schema.statics.findByUsername = function(username, cb){
  return this.find({username:username}, {_id: 0, __v: 0}, cb);
};

// the schema is useless so far
// we need to create a model using it
var Model = mongoose.model(Constant.USER_TABLE, schema);


// make this available to our users in our Node applications
module.exports = Model;