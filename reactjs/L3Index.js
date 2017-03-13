import React from 'react';
import ReactDOM from 'react-dom';
import FormView from './components/FormView';
import OrderDetail from './views/OrderDetail';
import OrderHistory from './views/OrderHistory';
import PubSub from 'pubsub-js';

class L3Page extends React.Component {

	constructor(props) {
		super(props);
		this.components = [
			<OrderHistory />,
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
	    		(this.state.slno === 0)? (<OrderHistory />) : (this.state.slno === 1) 
	    		? (<FormView />) : (<OrderDetail orderId={this.state.orderId} />)
	    	}
	    	</div>
	    );
	}
}

var userInfo = window.userInfo.replace(/&quot;/ig, '\"');
	window.userInfo = userInfo = JSON.parse(userInfo);
ReactDOM.render(
  <L3Page />,
  document.getElementById('main')
);