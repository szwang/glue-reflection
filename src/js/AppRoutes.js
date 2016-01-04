
export default {
  childRoutes: [

    /*** ROUTES ACCESSIBLE BY ANYONE ***/

    { 
      path: '/about',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/AboutPage.react'));
        })
      }
    }, {
      path: '/',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/HomePage.react'));
        })
      }      
    }, {
      path: '/watch',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/WatchPage.react'));
        })
      }
    }
  ]
}