import React from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';

class Panel extends React.Component {

	constructor(props) {
		super(props);
		this.buttonClick = this.buttonClick.bind(this);
	}

	buttonClick(e) {
		console.log(e.target.getAttribute('data-index'), e.target.textContent);
		PubSub.publish('VIEW_CHANGE', 1);
	}

	render() {
		var self = this;
		var title = this.props.title || 'Panel title';
		var buttons = this.props.buttons || '';
		if(buttons !== ""){
			buttons = buttons.split('|');
			buttons = buttons.map(function(item, index, arr){
				return <button className="btn btn-default btn-sm" key={index} onClick={self.buttonClick} data-index={index} style={{marginRight:"3px"}}>{item}</button>
			});
		}
	    return (
			<div className="panel panel-default">
				<div className="panel-heading"  style={{position:"relative"}}>
					<h3 className="panel-title">{title}</h3>
					<div style={{position:'absolute', right:0, top:"3px"}}>{buttons}</div>
				</div>
				<div className="panel-body">{this.props.children}</div>
			</div>
	    );
	}
}

module.exports = Panel;