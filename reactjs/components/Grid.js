import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PubSub from 'pubsub-js';

class Grid extends React.Component {

	constructor(props) {
		super(props);
		//this.state = { orders: [{},{}] };
		this.colClickHandler = this.colClickHandler.bind(this);
	}

	componentWillMount() {

	}

	colClickHandler(e) {
		e.preventDefault();
		var col = e.target.getAttribute("data-col");
		var row = parseInt(e.target.getAttribute("data-row"));
		console.log(col, row);
	}

	render() {

		var self = this;

		/*var cols = [
			{header:"col1", dataIndex: "a", clickable:true, className:"uu"},
			{header:"col2", dataIndex: "b", clickable:true},
			{header:"col3", dataIndex: "c"}
		];
		var rows = [
			{a:"aa1", b:"bb1", c:"cc1"}, 
			{a:"aa2", b:"bb2", c:"cc2"}, 
			{a:"aa3", b:"bb3", c:"cc3"}, 
			{a:"aa4", b:"bb4", c:"cc4"}
		];*/
		var cols = this.props.columns || [];
		var rows = this.props.records || [];
		var colHeaders = cols.map(function(item, index, opts){
			return (<td key={index}>{item.header}</td>)
		});

		var myOrders = rows.map(function(item, index){
			var rCol = cols.map(function(t, i, o){
				var className = t.className || '';
				var col = item[t.dataIndex];
				if (t.clickable) {
					col = (<button type="button" className="btn btn-link" data-col={t.dataIndex} data-row={index} onClick={self.colClickHandler} style={{padding:0}}>{item[t.dataIndex]}</button>);
				}
				return (<td key={t.dataIndex} className={className}>{col}</td>)
			});
			return (<tr key={index}>{rCol}</tr>)
		});

	    return (
			<table className="table table-condensed">
				<thead>
					<tr>{colHeaders}</tr>
				</thead>
				<tbody>
					{myOrders}
				</tbody>
			</table>
	    );
	}
}

module.exports = Grid;
