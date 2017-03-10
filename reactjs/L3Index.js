import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './components/Panel'

class L3Page extends React.Component {
	render() {
	  	console.log('L3Page render');
	    return (
	    	<div>
			    <Panel title="My Order History" />
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