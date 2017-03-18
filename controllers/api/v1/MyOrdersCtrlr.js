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
	Product.find({}, {_id: 0, __v: 0}, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
});

apiv1.get('/approvedlist', function(req, res) {
	PlaceOrder.find({l2Approve:true}, {_id: 0, __v: 0}, function(err, records) {
		var list = [];
		var indexNumbers = [];

		for (var i = 0; i < records.length; i++) {
			var items = records[i].items;
			for (var j = 0; j < items.length; j++) {
				
				var index = indexNumbers.indexOf(items[j].product.index);
				if(index === -1){
					indexNumbers.push(items[j].product.index);
					list.push({
						"name": items[j].product.name,
						"index": items[j].product.index,
						"qty": items[j].qty
					});
				}else{
					list[index].qty += items[j].qty;
				}
			}
		}

		res.send({data: list, status: true, errCode: "", errMsg: ""});
	})
});

//show list of all placed orders
apiv1.get('/allOrders', function(req, res) {
	PlaceOrder.find({}, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
	//res.send('Hello from APIv1 root route1.');
});

//show list of placed order by the user
apiv1.get('/orders/:userid', function(req, res) {
	PlaceOrder.findByUser(req.params.userid, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
	//res.send('Hello from APIv1 root route1.');
});

apiv1.post('/placeOrder', function(req, res) {
	var records = req.body;
	req.body.orderDate = new Date();
	//console.log(req.body);
	var placeOrder = new PlaceOrder(req.body);
	placeOrder.save(function(){
		res.send({data: req.body, status: true, errCode: "", errMsg: ""});
	});
	/*PlaceOrder.findByUser(req.params.userid, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})*/
	//res.send('Hello from APIv1 root route1.');
});

apiv1.get('/orderDetail/:orderid', function(req, res) {
	PlaceOrder.findByOrderId(req.params.orderid, function(err, records) {
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	})
	//res.send('Hello from APIv1 root route1.');
});

apiv1.post('/l2approve', function(req, res) {
	PlaceOrder.findOneAndUpdate({_id:req.body.orderid}, {l2Approve: true, status:"Approved"}, function (err, records) {
		records.status = "Approved";
		records.l2Approve = true;
		res.send({data: records, status: true, errCode: "", errMsg: ""});
	});
	//res.send('Hello from APIv1 root route1.');
});

module.exports = apiv1;