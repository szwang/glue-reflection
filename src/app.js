import React from 'react';
import Home from './js/pages/HomePage.react';
import App from './js/App.react';
import routes from './js/AppRoutes';
import { render } from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import WatchPage from './js/pages/WatchPage.react';
import WallPage from './js/pages/WallPage.react';

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

// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <Route path="/watch" component={WatchPage} />
//       <Route path="/wall" component={WallPage} />
//     </Route>
//   </Router>), 
//   document.getElementById('container'))