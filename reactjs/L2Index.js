import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './views/Dashboard';

var userInfo = window.userInfo.replace(/&quot;/ig, '\"');
	window.userInfo = userInfo = JSON.parse(userInfo);
ReactDOM.render(
  <Dashboard approver="true" />,
  document.getElementById('main')
);