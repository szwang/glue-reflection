webpackHotUpdate(0,{

/***/ 99:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';
	
	var _reactTransformHmr2 = __webpack_require__(102);
	
	var _reactTransformHmr3 = _interopRequireDefault(_reactTransformHmr2);
	
	var _react = __webpack_require__(60);
	
	var _reactTransformCatchErrors2 = __webpack_require__(101);
	
	var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);
	
	var _redboxReact = __webpack_require__(205);
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _react2 = _interopRequireDefault(_react);
	
	// import Router from 'react-router';
	
	var _components = {
	  _$About: {
	    displayName: 'About'
	  }
	};
	
	var _reactComponentWrapper = (0, _reactTransformHmr3['default'])({
	  filename: '/Users/Suzanne/projects/glue-reflection/src/js/components/about.js',
	  components: _components,
	  locals: [module],
	  imports: [_react]
	});
	
	var _reactComponentWrapper2 = (0, _reactTransformCatchErrors3['default'])({
	  filename: '/Users/Suzanne/projects/glue-reflection/src/js/components/about.js',
	  components: _components,
	  locals: [],
	  imports: [_react, _redboxReact]
	});
	
	function _wrapComponent(uniqueId) {
	  return function (ReactClass) {
	    return _reactComponentWrapper2(_reactComponentWrapper(ReactClass, uniqueId), uniqueId);
	  };
	}
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	'use strict';
	console.log("test");
	
	var About = (function (_React$Component) {
	  _inherits(About, _React$Component);
	
	  function About(props) {
	    _classCallCheck(this, _About);
	
	    _get(Object.getPrototypeOf(_About.prototype), 'constructor', this).call(this, props);
	    console.log('enter constructor');
	  }
	
	  _createClass(About, [{
	    key: 'render',
	    value: function render() {
	      console.log('enter render');
	      return _react2['default'].createElement(
	        'div',
	        null,
	        ' Hello World 1114441!!!!'
	      );
	    }
	  }]);
	
	  var _About = About;
	  About = _wrapComponent('_$About')(About) || About;
	  return About;
	})(_react2['default'].Component);
	
	exports['default'] = About;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(97)(module)))

/***/ }

})
//# sourceMappingURL=0.5ff0aa77f3d908dbe2a5.hot-update.js.map