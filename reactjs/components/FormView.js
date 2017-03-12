import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import Panel from './Panel';

class FormView extends React.Component {

	constructor(props) {
		super(props);
		this.submitHandler = this.submitHandler.bind(this);
		this.cancelHanler = this.cancelHanler.bind(this);
	}

	submitHandler(e) {
		e.preventDefault();
		console.log('submitHandler');
	}

	cancelHanler(e) {
		e.preventDefault();
		PubSub.publish('VIEW_CHANGE', 0);
	}

	render() {
	    return (
	    	<Panel title="Form">
				<form className="form" onSubmit={this.submitHandler}>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email address</label>
						<input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					</div>
					<button type="button" className="btn btn-default" onClick={this.cancelHanler}>Cancel</button> &nbsp;
					<button type="submit" className="btn btn-default">Submit</button>
				</form>
			</Panel>
	    );
	}
}

module.exports = FormView;