// grab the things we need
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var Schema = mongoose.Schema;

var Constant = require('../helpers/Constant');
// create a schema
var schema = new Schema({
  index: Number,
  name: String,
  price: Number,
  csdPrice: Number,
  category: String,
  supplier: String,
  created_at: Date,
  updated_at: Date
}, { strict: false });

// adding static methods to the Model
schema.statics.findByPIndex = function(index, cb){
  return this.find({index:index}, {_id: 0, __v: 0}, cb);
};

// the schema is useless so far
// we need to create a model using it
var Model = mongoose.model(Constant.PRODUCT_TABLE, schema);


// make this available to our users in our Node applications
module.exports = Model;