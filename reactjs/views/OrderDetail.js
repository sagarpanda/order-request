import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import axios from 'axios';
import Panel from './../components/Panel';

class FormView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			orderBy: '',
			orderDate: '',
			status: '',
			storeName: '',
			total: 0
		};
		this.cancelHanler = this.cancelHanler.bind(this);
	}

	componentWillMount() {
		console.log('componentWillUnmount: FormView');
		var self = this;
		var total = 0;
		axios.get('/api/v1/orderDetail/'+this.props.orderId)
		.then(function(response){
			for (var i = response.data.data.items.length - 1; i >= 0; i--) {
				total += response.data.data.items[i].price;
			}
			response.data.data.total = total;
			self.setState(response.data.data);
		});
	}

	cancelHanler(e) {
		e.preventDefault();
		PubSub.publish('VIEW_CHANGE', {slno: 0});
	}

	render() {

		var self = this;

		var items = this.state.items.map(function(item, index){
			return (<tr key={index}>
						<td>{item.product.index} - {item.product.name} </td>
						<td>{item.qty} x GBP {item.product.csdPrice}</td>
						<td style={{textAlign:"right"}}>{item.price}</td>
					</tr>)
		});

		var title = "Order Detail - "+this.state.orderDate;

	    return (
	    	<Panel title={title}>
				<form className="form" onSubmit={this.submitHandler}>
					<div className="col-xs-12 col-sm-12" style={{minHeight:"250px"}}>

						<table className="table table-condensed">
							<thead>
								<tr>
									<td className="col-xs-6 col-sm-6">Item</td>
									<td className="col-xs-4 col-sm-4">Qty x Price</td>
									<td className="col-xs-2 col-sm-2" style={{textAlign:"right"}}>Price</td>
								</tr>
							</thead>
							<tbody>
								{items}
								<tr>
									<td>Total</td>
									<td></td>
									<td style={{textAlign:"right"}}>{this.state.total}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-xs-12 col-sm-12" style={{textAlign:"right"}}>
						<button type="button" className="btn btn-default" onClick={this.cancelHanler}>Go Back</button> &nbsp;
					</div>
				</form>
			</Panel>
	    );
	}
}

module.exports = FormView;