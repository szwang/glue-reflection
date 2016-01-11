import React from 'react';
import Home from './js/pages/HomePage.react';
import App from './js/App.react';
import routes from './js/AppRoutes';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('./js/App.react'),
    childRoutes: routes.childRoutes
  }]
}

render(
  <Router history={browserHistory} routes={rootRoute} />, 
  document.getElementById('container')
)
