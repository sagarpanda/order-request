import React from 'react';
import ReactDOM from 'react-dom';

class L3Page extends React.Component {
  render() {
  	console.log('L3Page render');
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

ReactDOM.render(
  <L3Page name="Sagar" />,
  document.getElementById('main')
);