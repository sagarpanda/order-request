import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './../components/Panel';
import GridView from './../components/GridView';
import Grid from './../components/Grid';

class OrderHistory extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount(){
		console.log('componentDidMount: OrderHistory', this.props.approver);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount: OrderHistory');
	}

	render() {
	    return (
			<Panel title="My Order History" buttons="Place Order">
				<GridView approver={this.props.approver} />
			</Panel>
	    );
	}
}

module.exports = OrderHistory;