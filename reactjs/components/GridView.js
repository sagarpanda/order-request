import React from 'react';
import ReactDOM from 'react-dom';

class GridView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
	    return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<td>#</td>
						<td>Date</td>
						<td>Store</td>
						<td>Status</td>
						<td>Order By</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
						<td>Column Content</td>
					</tr>
				</tbody>
			</table>
	    );
	}
}

module.exports = GridView;