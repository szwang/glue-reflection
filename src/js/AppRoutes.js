export default {
  childRoutes: [

    /*** ROUTES ACCESSIBLE BY ANYONE ***/

    { 
      path: '/camera',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/CameraPage.react'));
        })
      }
    }, {
      path: '/home',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/HomePage.react'))
        })
      }      
    }, { 
      path: '/watch',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/WatchPage.react'));
        })
      }
    }, {
      path: '/wall', //TODO: add identifiers to the routing for each video
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/WallPage.react'))
        })
      }
    }
  ]
}
