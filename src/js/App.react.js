'use strict';
import React from 'react';  
// import Router from 'react-router';  
// import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import UserCamBox from './components/UserCamBox.react';
import ReactDOM from 'react-dom';
import About from './components/About.react'

// let App = React.createClass({  
//   render() {
//     return (
//       <div className="nav">
//         <Link to="app">Home</Link>
//         <Link to="login">Login</Link>

//        // { this is the importTant part }
//         <RouteHandler/>
//       </div>
//     );
//   }
// });

// let routes = (  
//   <Route name="app" path="/" handler={App}>
//     <Route name="login" path="/login" handler={LoginHandler}/>
//   </Route>
// );

// Router.run(routes, function (Handler) {  
//   React.render(<About/>, document.body);
// });


ReactDOM.render(<UserCamBox/>, document.getElementById('container'));
