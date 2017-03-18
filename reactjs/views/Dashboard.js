import React from 'react';
import ReactDOM from 'react-dom';
import FormView from './../components/FormView';
import OrderDetail from './OrderDetail';
import OrderHistory from './OrderHistory';
import PubSub from 'pubsub-js';

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.components = [
			<OrderHistory approver={props.approver} />,
			<FormView />,
			<OrderDetail orderId="58c5eae0f43bf76e4f70f924" />
		];
		this.state = {
			slno: 0,
			orderId: ''
		};
		this.tokeSub = null;
		this.subscribeHandler = this.subscribeHandler.bind(this);
	}

	componentDidMount() {
		this.tokeSub = PubSub.subscribe( 'VIEW_CHANGE', this.subscribeHandler );
	}

	componentWillUnmount() {
		PubSub.unsubscribe(this.tokeSub);
	}

	subscribeHandler(action, option) {
		var orderId = option.orderId || '';
		this.setState({slno: option.slno, orderId:orderId});
	}

	updateView(slno) {
		this.setState({slno: slno});
	}

	render() {
		var view = this.components[this.state.slno];
	    return (
	    	<div>
	    	{
	    		(this.state.slno === 0)? (<OrderHistory approver={this.props.approver} />) : (this.state.slno === 1) 
	    		? (<FormView />) : (<OrderDetail orderId={this.state.orderId} />)
	    	}
	    	</div>
	    );
	}
}

module.exports = Dashboard;