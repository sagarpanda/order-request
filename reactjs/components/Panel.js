import React from 'react';
import ReactDOM from 'react-dom';

class Panel extends React.Component {

	render() {

		var title = this.props.title || 'Panel title';

	    return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">{title}</h3>
				</div>
				<div className="panel-body">Panel content</div>
			</div>
	    );
	}
}

module.exports = Panel;