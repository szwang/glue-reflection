webpackJsonp([4],{

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _VidWatchBox = __webpack_require__(475);
	
	var _VidWatchBox2 = _interopRequireDefault(_VidWatchBox);
	
	var _UserRecordBox = __webpack_require__(476);
	
	var _UserRecordBox2 = _interopRequireDefault(_UserRecordBox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WatchPage = (function (_React$Component) {
	  _inherits(WatchPage, _React$Component);
	
	  function WatchPage() {
	    _classCallCheck(this, WatchPage);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(WatchPage).apply(this, arguments));
	  }
	
	  _createClass(WatchPage, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_VidWatchBox2.default, null),
	        _react2.default.createElement(_UserRecordBox2.default, null)
	      );
	    }
	  }]);
	
	  return WatchPage;
	})(_react2.default.Component);
	
	module.exports = WatchPage;

/***/ },

/***/ 475:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var VidWatchBox = (function (_React$Component) {
	  _inherits(VidWatchBox, _React$Component);
	
	  function VidWatchBox(props) {
	    _classCallCheck(this, VidWatchBox);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(VidWatchBox).call(this, props));
	  }
	
	  _createClass(VidWatchBox, [{
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement(
	        "div",
	        null,
	        _react2.default.createElement(
	          "video",
	          { controls: true },
	          _react2.default.createElement("source", { src: "http://www.html5rocks.com/en/tutorials/video/basics/devstories.webm" })
	        )
	      );
	    }
	  }]);
	
	  return VidWatchBox;
	})(_react2.default.Component);
	
	exports.default = VidWatchBox;

/***/ },

/***/ 476:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactWebcam = __webpack_require__(479);
	
	var _reactWebcam2 = _interopRequireDefault(_reactWebcam);
	
	var _Webcam = __webpack_require__(477);
	
	var _Webcam2 = _interopRequireDefault(_Webcam);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserRecordBox = (function (_React$Component) {
	  _inherits(UserRecordBox, _React$Component);
	
	  function UserRecordBox(props) {
	    _classCallCheck(this, UserRecordBox);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserRecordBox).call(this, props));
	  }
	
	  _createClass(UserRecordBox, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_Webcam2.default, null),
	        _react2.default.createElement(_reactWebcam2.default, { audio: false })
	      );
	    }
	  }]);
	
	  return UserRecordBox;
	})(_react2.default.Component);
	
	exports.default = UserRecordBox;

/***/ },

/***/ 477:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _webcamUtils = __webpack_require__(478);
	
	var _webcamUtils2 = _interopRequireDefault(_webcamUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WebcamButton = (function (_React$Component) {
	  _inherits(WebcamButton, _React$Component);
	
	  function WebcamButton(props) {
	    _classCallCheck(this, WebcamButton);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WebcamButton).call(this, props));
	
	    _this.onSuccess = _this.onSuccess.bind(_this);
	    _this.onError = _this.onError.bind(_this);
	    _this.onStart = _this.onStart.bind(_this);
	    _this.onStop = _this.onStop.bind(_this);
	    return _this;
	  }
	
	  _createClass(WebcamButton, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia;
	    }
	  }, {
	    key: 'onSuccess',
	    value: function onSuccess(stream) {
	      this.setState({ mediaRecorder: new MediaRecorder(stream) });
	      this.state.mediaRecorder.onstop = function (e) {
	        _webcamUtils2.default.onStop(e);
	      };
	      this.state.mediaRecorder.ondataavailable = function (e) {
	        chunks.push(e.data);
	        console.log('chunks: ', chunks);
	      };
	    }
	  }, {
	    key: 'onError',
	    value: function onError(err) {
	      console.log('An error occured: ', err);
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart() {
	      var recorderConstraints = { video: true };
	      if (navigator.getUserMedia) {
	        this.state.mediaRecorder.start();
	        console.log(this.state.mediaRecorder.state);
	        console.log('recorder started');
	        navigator.getUserMedia(recorderConstraints, this.onSuccess, this.onError);
	      } else {
	        console.log('getUserMedia is not supported');
	      }
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.state.mediaRecorder.stop();
	      console.log(this.state.mediaRecorder.state);
	      console.log('recorder stopped');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onStart },
	          'Start record'
	        ),
	        _react2.default.createElement(
	          'button',
	          { onClick: this.onStop },
	          'Stop record'
	        )
	      );
	    }
	  }]);
	
	  return WebcamButton;
	})(_react2.default.Component);
	
	exports.default = WebcamButton;

/***/ },

/***/ 478:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onStop = onStop;
	function onStop(e) {
	  console.log('MediaRecorder.stop() called');
	  var chunks = [];
	  var clipName = prompt('enter a name');
	
	  var blob = new Blob(chunks, { 'type': 'video/mp4; codecs=opus' });
	
	  chunks = [];
	  var vidURL = window.URL.createObjectURL(blob);
	  console.log('vidurl: ', vidURL);
	  video.src = vidURL;
	  console.log('recorder stopped');
	}

/***/ },

/***/ 479:
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(1));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["Webcam"] = factory(require("react"));
		else
			root["Webcam"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		exports.__esModule = true;
	
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
		function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
		var _react = __webpack_require__(1);
	
		var _react2 = _interopRequireDefault(_react);
	
		function hasGetUserMedia() {
		  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
		}
	
		var Webcam = (function (_Component) {
		  _inherits(Webcam, _Component);
	
		  _createClass(Webcam, null, [{
		    key: 'defaultProps',
		    value: {
		      audio: true,
		      height: 480,
		      width: 640,
		      screenshotFormat: 'image/webp',
		      onUserMedia: function onUserMedia() {}
		    },
		    enumerable: true
		  }, {
		    key: 'propTypes',
		    value: {
		      audio: _react.PropTypes.bool,
		      onUserMedia: _react.PropTypes.func,
		      height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
		      width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
		      screenshotFormat: _react.PropTypes.oneOf(['image/webp', 'image/png', 'image/jpeg']),
		      className: _react.PropTypes.string
		    },
		    enumerable: true
		  }, {
		    key: 'mountedInstances',
		    value: [],
		    enumerable: true
		  }, {
		    key: 'userMediaRequested',
		    value: false,
		    enumerable: true
		  }]);
	
		  function Webcam() {
		    _classCallCheck(this, Webcam);
	
		    _Component.call(this);
		    this.state = {
		      hasUserMedia: false
		    };
		  }
	
		  Webcam.prototype.componentDidMount = function componentDidMount() {
		    if (!hasGetUserMedia()) return;
	
		    Webcam.mountedInstances.push(this);
	
		    if (!this.state.hasUserMedia && !Webcam.userMediaRequested) {
		      this.requestUserMedia();
		    }
		  };
	
		  Webcam.prototype.requestUserMedia = function requestUserMedia() {
		    var _this = this;
	
		    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	
		    var sourceSelected = function sourceSelected(audioSource, videoSource) {
		      var constraints = {
		        video: {
		          optional: [{ sourceId: videoSource }]
		        }
		      };
	
		      if (_this.props.audio) {
		        constraints.audio = {
		          optional: [{ sourceId: audioSource }]
		        };
		      }
	
		      navigator.getUserMedia(constraints, function (stream) {
		        Webcam.mountedInstances.forEach(function (instance) {
		          return instance.handleUserMedia(null, stream);
		        });
		      }, function (e) {
		        Webcam.mountedInstances.forEach(function (instance) {
		          return instance.handleUserMedia(e);
		        });
		      });
		    };
	
		    if (this.props.audioSource && this.props.videoSource) {
		      sourceSelected(this.props.audioSource, this.props.videoSource);
		    } else {
		      if ('mediaDevices' in navigator) {
		        navigator.mediaDevices.enumerateDevices().then(function (devices) {
		          var audioSource = null;
		          var videoSource = null;
	
		          devices.forEach(function (device) {
		            if (device.kind === 'audio') {
		              audioSource = device.id;
		            } else if (device.kind === 'video') {
		              videoSource = device.id;
		            }
		          });
	
		          sourceSelected(audioSource, videoSource);
		        })['catch'](function (error) {
		          console.log(error.name + ': ' + error.message); // eslint-disable-line no-console
		        });
		      } else {
		          MediaStreamTrack.getSources(function (sources) {
		            var audioSource = null;
		            var videoSource = null;
	
		            sources.forEach(function (source) {
		              if (source.kind === 'audio') {
		                audioSource = source.id;
		              } else if (source.kind === 'video') {
		                videoSource = source.id;
		              }
		            });
	
		            sourceSelected(audioSource, videoSource);
		          });
		        }
		    }
	
		    Webcam.userMediaRequested = true;
		  };
	
		  Webcam.prototype.handleUserMedia = function handleUserMedia(error, stream) {
		    if (error) {
		      this.setState({
		        hasUserMedia: false
		      });
	
		      return;
		    }
	
		    var src = window.URL.createObjectURL(stream);
	
		    this.stream = stream;
		    this.setState({
		      hasUserMedia: true,
		      src: src
		    });
	
		    this.props.onUserMedia();
		  };
	
		  Webcam.prototype.componentWillUnmount = function componentWillUnmount() {
		    var index = Webcam.mountedInstances.indexOf(this);
		    Webcam.mountedInstances.splice(index, 1);
	
		    if (Webcam.mountedInstances.length === 0 && this.state.hasUserMedia) {
		      this.stream.stop();
		      Webcam.userMediaRequested = false;
		      window.URL.revokeObjectURL(this.state.src);
		    }
		  };
	
		  Webcam.prototype.getScreenshot = function getScreenshot() {
		    if (!this.state.hasUserMedia) return null;
	
		    var canvas = this.getCanvas();
		    return canvas.toDataURL(this.props.screenshotFormat);
		  };
	
		  Webcam.prototype.getCanvas = function getCanvas() {
		    if (!this.state.hasUserMedia) return null;
	
		    var video = _react2['default'].findDOMNode(this);
		    if (!this.ctx) {
		      var _canvas = document.createElement('canvas');
		      _canvas.height = video.clientHeight;
		      _canvas.width = video.clientWidth;
		      this.canvas = _canvas;
		      this.ctx = _canvas.getContext('2d');
		    }
	
		    var ctx = this.ctx;
		    var canvas = this.canvas;
	
		    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	
		    return canvas;
		  };
	
		  Webcam.prototype.render = function render() {
		    return _react2['default'].createElement('video', {
		      autoPlay: true,
		      width: this.props.width,
		      height: this.props.height,
		      src: this.state.src,
		      className: this.props.className
		    });
		  };
	
		  return Webcam;
		})(_react.Component);
	
		exports['default'] = Webcam;
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
	/***/ function(module, exports) {
	
		module.exports = __WEBPACK_EXTERNAL_MODULE_1__;
	
	/***/ }
	/******/ ])
	});
	;

/***/ }

});
//# sourceMappingURL=4.bundle.js.map