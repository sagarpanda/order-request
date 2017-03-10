// grab the things we need
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var _ = require('lodash');
var Schema = mongoose.Schema;

var Constant = require('../helpers/Constant');
// create a schema
var schema = new Schema({
  storeName: 	String,
  orderDate: 	Date,
  status: 		String,
  orderBy: 		String,
  items: 		[],
  created_at: 	Date,
  updated_at: 	Date
}, { strict: false });

// adding static methods to the Model
schema.statics.findByUser = function(orderBy, cb){
  return this.find({orderBy:orderBy}, {_id: 0, __v: 0}, cb);
};

schema.statics.findByOrderId = function(orderId, cb){
  return this.findOne({_id: ObjectId(orderId)}, {_id: 0, __v: 0}, cb);
};

// the schema is useless so far
// we need to create a model using it
var Model = mongoose.model(Constant.PLACE_ORDER_TABLE, schema);

// make this available to our users in our Node applications
module.exports = Model;