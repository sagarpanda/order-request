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
	}

	componentWillMount() {

		var self = this;
		axios.get('/api/v1/orders/user3')
		.then(function(response){
			self.setState({orders:response.data.data.reverse()});
		});
	}

	orderDetailHandler(e) {
		e.preventDefault();
		var index = parseInt(e.target.getAttribute('data-index'));
		PubSub.publish('VIEW_CHANGE', {slno: 2, orderId: this.state.orders[index]._id});
	}

	render() {

		var self = this;
		var myOrders = this.state.orders.map(function(order, index){
			return (<tr key={index}>
						<td>{index + 1}</td>
						<td><button type="button" className="btn btn-link" data-index={index} onClick={self.orderDetailHandler} style={{padding:0}}>{order.orderDate}</button></td>
						<td>{order.storeName}</td>
						<td>{order.status}</td>
						<td>{order.orderBy}</td>
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