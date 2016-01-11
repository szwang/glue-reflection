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
    }
  ]
}
