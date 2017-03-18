import React from 'react';
import ReactDOM from 'react-dom';
import L1Dashboard from './views/L1Dashboard';

var userInfo = window.userInfo.replace(/&quot;/ig, '\"');
	window.userInfo = userInfo = JSON.parse(userInfo);
ReactDOM.render(
  <L1Dashboard approver="true" />,
  document.getElementById('main')
);