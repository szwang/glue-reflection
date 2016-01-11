export default {
  childRoutes: [

    /*** ROUTES ACCESSIBLE BY ANYONE ***/

    { 
      path: '/camera',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./pages/AboutPage.react'));
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
