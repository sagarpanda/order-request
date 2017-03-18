import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PubSub from 'pubsub-js';

class GridView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			orders: []
		}
		this.orderDetailHandler = this.orderDetailHandler.bind(this);
		this.approveHandler = this.approveHandler.bind(this);
	}

	componentWillMount() {

		var self = this;
		var url = "/api/v1/allOrders";//for user2
		if (userInfo.role === 3) {
			url = '/api/v1/orders/'+userInfo.username;
		}
		axios.get(url)
		.then(function(response){
			self.setState({orders:response.data.data.reverse()});
		});
	}

	orderDetailHandler(e) {
		e.preventDefault();
		var index = parseInt(e.target.getAttribute('data-index'));
		PubSub.publish('VIEW_CHANGE', {slno: 2, orderId: this.state.orders[index]._id});
	}

	approveHandler(e){
		e.preventDefault();
		var self = this;
		var index = parseInt(e.target.getAttribute('data-index'));
		console.log('approveHandler: '+this.state.orders[index]);
		axios.post('/api/v1/l2approve', {orderid:this.state.orders[index]._id})
		.then(function(response){
			self.state.orders[index] = response.data.data;
			self.setState({orders:self.state.orders});
		});
	}

	render() {

		var self = this;
		var extraHeaderCol = (<td>Action</td>);
		if(self.props.approver === "false"){
			extraHeaderCol = null;
		}
		var myOrders = this.state.orders.map(function(order, index){
			var extraCol = (<td></td>);
			if(!order.l2Approve){
			var extraCol = (<td><button type="button" className="btn btn-link" data-index={index} onClick={self.approveHandler} style={{padding:0}} >Approve</button></td>);
			}
			if(self.props.approver === "false"){
				extraCol = null;
			}
			return (<tr key={index}>
						<td>{index + 1}</td>
						<td><button type="button" className="btn btn-link" data-index={index} onClick={self.orderDetailHandler} style={{padding:0}}>{order.orderDate}</button></td>
						<td>{order.storeName}</td>
						<td>{order.status}</td>
						<td>{order.orderBy}</td>
						{extraCol}
					</tr>)
		});

	    return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<td>#</td>
						<td>Date</td>
						<td>Store</td>
						<td>Status</td>
						<td>Order By</td>
						{extraHeaderCol}
					</tr>
				</thead>
				<tbody>
					{myOrders}
				</tbody>
			</table>
	    );
	}
}

module.exports = GridView;