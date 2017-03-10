var express 	= require('express');
var mongoose 	= require('mongoose');
var apiv1 		= express.Router();

var Constant 	= require('../../../helpers/Constant');
var User 		= require('../../../models/UserModel');
var Product 	= require('../../../models/ProductModel');
var PlaceOrder 	= require('../../../models/PlaceOrderModel');

apiv1.get('/', function(req, res) {
	res.send('Hello from APIv1 root route.');
});

apiv1.get('/products', function(req, res) {
	res.send('Hello from APIv1 root route1.');
});

apiv1.get('/orders/:userid', function(req, res) {
	PlaceOrder.findByUser(req.params.userid, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
	//res.send('Hello from APIv1 root route1.');
});

apiv1.get('/orderDetail/:orderid', function(req, res) {
	PlaceOrder.findByOrderId(req.params.orderid, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
	//res.send('Hello from APIv1 root route1.');
});

module.exports = apiv1;