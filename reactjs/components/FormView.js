import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import axios from 'axios';
import Panel from './Panel';

class FormView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			items: [],
			total: 0,
			qty: 1,
			addItem:{"index" : "Select Product", "category" : "", "name" : "", "csdPrice" : 0, "mrp" : "", "supplier" : ""}
		};
		this.submitHandler = this.submitHandler.bind(this);
		this.productAddHandler = this.productAddHandler.bind(this);
		this.cancelHanler = this.cancelHanler.bind(this);
		this.productChangeHandler = this.productChangeHandler.bind(this);
		this.qtyChangeHandler = this.qtyChangeHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	componentWillMount() {
		console.log('componentWillUnmount: FormView');
		var self = this;
		axios.get('/api/v1/products')
		.then(function(response){
			response.data.data.unshift(self.state.addItem);
			self.setState({products:response.data.data});
		});
	}

	productChangeHandler(e) {
		console.log(e.target);
		var indexVal = e.target.value.split('-')[0].trim();
		for(var i=0; i < this.state.products.length; i++){
			if(this.state.products[i].index == indexVal){
				this.setState({addItem: this.state.products[i]});
				break;
			}
		}
	}

	qtyChangeHandler(e) {
		this.setState({qty: e.target.value});
	}

	submitHandler(e) {
		e.preventDefault();
		console.log('submitHandler');
		axios.post('/api/v1/placeOrder',{
			items 		:this.state.items, 
			storeName	: "User3 Store", 
			status 		: "Awaiting Approval",
			l2Approve 	: false,
			orderBy 	: userInfo.username
		})
		.then(function(response){
			console.log(response.data);
			PubSub.publish('VIEW_CHANGE', {slno: 0});
		});
	}

	productAddHandler(e) {
		e.preventDefault();
		console.log('productAddHandler');
		var price = this.state.qty * this.state.addItem.csdPrice;
		var items = this.state.items.concat({qty:this.state.qty, price:price, product:this.state.addItem });
		var total = this.state.total + price;
		this.setState({items:items, total:total, qty:1});
	}

	deleteHandler(e) {
		e.preventDefault();
		console.log('deleteHandler', e.target.getAttribute('data-index'));
		var index = parseInt(e.target.getAttribute('data-index'));
		var total = this.state.total - this.state.items[index].price;
		this.state.items.splice(index, 1);
		this.setState({items:this.state.items, total:total});
	}

	cancelHanler(e) {
		e.preventDefault();
		PubSub.publish('VIEW_CHANGE', {slno: 0});
	}

	render() {

		var self = this;

		var productList = this.state.products.map(function(product){
			return <option key={product.index}>{product.index} - {product.name}</option>
		});

		var items = this.state.items.map(function(item, index){
			return (<tr key={index}>
						<td><button type="button" className="btn btn-link" data-index={index} onClick={self.deleteHandler}>X</button> {item.product.index} - {item.product.name} </td>
						<td>{item.qty} x GBP {item.product.csdPrice}</td>
						<td style={{textAlign:"right"}}>{item.price}</td>
					</tr>)
		});

	    return (
	    	<Panel title="Form">
				<form className="form" onSubmit={this.submitHandler}>
					<div className="form-group col-xs-6 col-sm-6">
						<label htmlFor="product">Product</label>
						<select className="form-control" id="product" placeholder="Product" onChange={this.productChangeHandler}>
							{productList}
						</select>
					</div>
					<div className="form-group col-xs-2 col-sm-2">
						<label htmlFor="qry">Quantity</label>
						<input type="number" className="form-control" id="qry" placeholder="" value={this.state.qty} onChange={this.qtyChangeHandler} />
					</div>
					<div className="form-group col-xs-2 col-sm-2">
						<label htmlFor="price">Price</label>
						<input type="text" className="form-control" id="price" placeholder=""  value={this.state.qty * this.state.addItem.csdPrice} disabled />
					</div>
					<div className="form-group col-xs-2 col-sm-2">
						<label>&nbsp;</label>
						<button type="button" className="form-control btn btn-default" onClick={this.productAddHandler}>Add</button>
					</div>
					<div className="col-xs-12 col-sm-12" style={{minHeight:"250px"}}>

						<table className="table table-condensed">
							<thead>
								<tr>
									<td className="col-xs-6 col-sm-6"><span style={{paddingLeft:"38px"}}>Item</span></td>
									<td className="col-xs-4 col-sm-4">Qty x Price</td>
									<td className="col-xs-2 col-sm-2" style={{textAlign:"right"}}>Price</td>
								</tr>
							</thead>
							<tbody>
								{items}
							</tbody>
						</table>
					</div>
					<div className="col-xs-12 col-sm-12">

						<table className="table table-condensed">
							<tbody>
								<tr>
									<td>Total</td>
									<td></td>
									<td style={{textAlign:"right"}}>{this.state.total}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-xs-12 col-sm-12" style={{textAlign:"right"}}>
						<button type="button" className="btn btn-default" onClick={this.cancelHanler}>Cancel</button> &nbsp;
						<button type="submit" className="btn btn-default">Submit</button>
					</div>
				</form>
			</Panel>
	    );
	}
}

module.exports = FormView;