import React from 'react';
import ReactDOM from 'react-dom';
import FormView from './components/FormView';
import OrderHistory from './views/OrderHistory';
import PubSub from 'pubsub-js';

class L3Page extends React.Component {

	constructor(props) {
		super(props);
		this.components = [
			<OrderHistory />,
			<FormView />
		];
		this.state = {
			slno: 0
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

	subscribeHandler(action, slno) {
		console.log(slno);
		this.updateView(slno);
	}

	updateView(slno) {
		this.setState({slno: slno});
	}

	render() {
		var view = this.components[this.state.slno];
	    return (
	    	<div>{ view }</div>
	    );
	}
}

var userInfo = window.userInfo.replace(/&quot;/ig, '\"');
	window.userInfo = userInfo = JSON.parse(userInfo);
ReactDOM.render(
  <L3Page />,
  document.getElementById('main')
);