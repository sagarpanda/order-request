import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './../components/Panel';
import GridView from './../components/GridView';

class OrderHistory extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount: OrderHistory');
	}

	render() {
	    return (
			<Panel title="My Order History" buttons="Place Order">
				<GridView />
			</Panel>
	    );
	}
}

module.exports = OrderHistory;