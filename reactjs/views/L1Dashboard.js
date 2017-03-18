import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Panel from './../components/Panel';
import Grid from './../components/Grid';
import Dashboard from './Dashboard';

class LiDashboard extends React.Component {

	constructor(props) {
		super(props);
		this.cols = [
			{header:"Index", dataIndex: "index"},
			{header:"Name", dataIndex: "name"},
			{header:"Quantity", dataIndex: "qty"}
		];
		this.state = {
			rows: []
		}
	}

	componentWillMount() {
		var self = this;
		axios.get("/api/v1/approvedlist")
		.then(function(response){
			self.setState({rows:response.data.data});
		});
	}

	render() {
		return (
			<div>
				<Panel title="Approved Order List">
					<Grid columns={this.cols} records={this.state.rows} />
				</Panel>
			</div>
		);
	}

}
module.exports = LiDashboard;