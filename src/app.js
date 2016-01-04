import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './js/AppRoutes';

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
