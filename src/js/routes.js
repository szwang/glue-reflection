'use strict';

import React from 'react';
import Router from 'react-router';

import About from './components/about'

const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

const routes = (
  <Route handler= {} >
    <DefaultRoute name="home" handler={About}/>
  </Route>
);

export default Routes;