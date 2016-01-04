import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, IndexRoute } from 'react-router';
import routes from './js/AppRoutes';
import Home from './js/pages/HomePage.react';

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('./js/App.react'),
    childRoutes: routes.childRoutes
  }]
}

render(
  <Router history={browserHistory} routes={rootRoute}>
    <IndexRoute component={Home} />
  </Router>, 
  document.getElementById('container')
);
