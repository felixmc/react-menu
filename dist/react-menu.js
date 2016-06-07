(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactMenu"] = factory(require("react"), require("react-dom"));
	else
		root["ReactMenu"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MenuOption = exports.MenuOptions = exports.MenuTrigger = exports.default = undefined;

	var _Menu = __webpack_require__(1);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _MenuTrigger = __webpack_require__(4);

	var _MenuTrigger2 = _interopRequireDefault(_MenuTrigger);

	var _MenuOptions = __webpack_require__(6);

	var _MenuOptions2 = _interopRequireDefault(_MenuOptions);

	var _MenuOption = __webpack_require__(7);

	var _MenuOption2 = _interopRequireDefault(_MenuOption);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Menu2.default;
	exports.MenuTrigger = _MenuTrigger2.default;
	exports.MenuOptions = _MenuOptions2.default;
	exports.MenuOption = _MenuOption2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _MenuTrigger = __webpack_require__(4);

	var _MenuTrigger2 = _interopRequireDefault(_MenuTrigger);

	var _MenuOptions = __webpack_require__(6);

	var _MenuOptions2 = _interopRequireDefault(_MenuOptions);

	var _MenuOption = __webpack_require__(7);

	var _MenuOption2 = _interopRequireDefault(_MenuOption);

	var _uuid = __webpack_require__(8);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _injectCSS = __webpack_require__(9);

	var _injectCSS2 = _interopRequireDefault(_injectCSS);

	var _buildClassName = __webpack_require__(5);

	var _buildClassName2 = _interopRequireDefault(_buildClassName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Menu = function (_React$Component) {
	  _inherits(Menu, _React$Component);

	  _createClass(Menu, null, [{
	    key: 'propTypes',
	    get: function get() {
	      return {
	        children: function children(props, propName, componentName) {
	          var prop = props[propName];
	          var error = new Error('react-menu can only take two children, a MenuTrigger, and a MenuOptions');

	          var ok = _react2.default.Children.count(prop) === 2;
	          if (!ok) return error;

	          _react2.default.Children.forEach(prop, function (child) {
	            if (child.type !== _MenuOptions2.default && child.type !== _MenuTrigger2.default) {
	              ok = false;
	            }
	          });

	          if (!ok) return error;
	        }
	      };
	    }
	  }, {
	    key: 'childContextTypes',
	    get: function get() {
	      return {
	        id: _react2.default.PropTypes.string,
	        active: _react2.default.PropTypes.bool
	      };
	    }
	  }]);

	  function Menu(props, context) {
	    _classCallCheck(this, Menu);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).call(this, props, context));

	    _this.buildClassName = _buildClassName2.default;


	    _this.state = {
	      id: (0, _uuid2.default)(),
	      active: false,
	      selectedIndex: 0,
	      horizontalPlacement: 'right', // only 'right' || 'left'
	      verticalPlacement: 'bottom' // only 'top' || 'bottom'
	    };
	    return _this;
	  }

	  _createClass(Menu, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return {
	        id: this.state.id,
	        active: this.state.active
	      };
	    }
	  }, {
	    key: 'closeMenu',
	    value: function closeMenu(skipFocus) {
	      var _this2 = this;

	      this.setState({ active: false }, function () {
	        if (!skipFocus) _this2.focusTrigger();
	      });
	    }
	  }, {
	    key: 'focusTrigger',
	    value: function focusTrigger() {
	      _reactDom2.default.findDOMNode(this.refs.trigger).focus();
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur(e) {
	      var _this3 = this;

	      // give next element a tick to take focus
	      setTimeout(function () {
	        if (!_this3.refs.menu.contains(document.activeElement)) {
	          _this3.closeMenu(true);
	        }
	      }, 1);
	    }
	  }, {
	    key: 'handleTriggerToggle',
	    value: function handleTriggerToggle() {
	      this.setState({ active: !this.state.active }, this.afterTriggerToggle);
	    }
	  }, {
	    key: 'afterTriggerToggle',
	    value: function afterTriggerToggle() {
	      if (this.state.active) {
	        this.refs.options.focusOption(0);
	        this.updatePositioning();
	      }
	    }
	  }, {
	    key: 'updatePositioning',
	    value: function updatePositioning() {
	      var triggerRect = _reactDom2.default.findDOMNode(this.refs.trigger).getBoundingClientRect();
	      var optionsRect = _reactDom2.default.findDOMNode(this.refs.options).getBoundingClientRect();
	      var positionState = {};
	      // horizontal = left if it wont fit on left side
	      if (triggerRect.left + optionsRect.width > window.innerWidth) {
	        positionState.horizontalPlacement = 'left';
	      } else {
	        positionState.horizontalPlacement = 'right';
	      }
	      if (triggerRect.top + optionsRect.height > window.innerHeight) {
	        positionState.verticalPlacement = 'top';
	      } else {
	        positionState.verticalPlacement = 'bottom';
	      }
	      this.setState(positionState);
	    }
	  }, {
	    key: 'handleKeys',
	    value: function handleKeys(e) {
	      if (e.key === 'Escape') {
	        this.closeMenu();
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    }
	  }, {
	    key: 'renderTrigger',
	    value: function renderTrigger() {
	      var trigger = void 0;
	      var self = this;

	      _react2.default.Children.forEach(this.props.children, function (child) {
	        if (child.type === _MenuTrigger2.default) {
	          trigger = _react2.default.cloneElement(child, {
	            ref: 'trigger',
	            onToggleActive: self.handleTriggerToggle.bind(self)
	          });
	        }
	      });

	      return trigger;
	    }
	  }, {
	    key: 'renderMenuOptions',
	    value: function renderMenuOptions() {
	      var options = void 0;
	      var self = this;

	      _react2.default.Children.forEach(this.props.children, function (child) {
	        if (child.type === _MenuOptions2.default) {
	          options = _react2.default.cloneElement(child, {
	            ref: 'options',
	            horizontalPlacement: self.state.horizontalPlacement,
	            verticalPlacement: self.state.verticalPlacement,
	            onSelectionMade: self.closeMenu.bind(self)
	          });
	        }
	      });

	      return options;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          className: this.buildClassName('Menu'),
	          onKeyDown: this.handleKeys.bind(this),
	          onBlur: this.handleBlur.bind(this),
	          ref: 'menu'
	        },
	        this.renderTrigger(),
	        this.renderMenuOptions()
	      );
	    }
	  }]);

	  return Menu;
	}(_react2.default.Component);

	Menu.injectCSS = _injectCSS2.default;
	exports.default = Menu;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _buildClassName = __webpack_require__(5);

	var _buildClassName2 = _interopRequireDefault(_buildClassName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuTrigger = function (_React$Component) {
	  _inherits(MenuTrigger, _React$Component);

	  function MenuTrigger() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MenuTrigger);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MenuTrigger)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.buildClassName = _buildClassName2.default, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MenuTrigger, [{
	    key: 'toggleActive',
	    value: function toggleActive() {
	      this.props.onToggleActive(!this.context.active);
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      if (e.key === ' ') this.toggleActive();
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      if (e.key === 'Enter') this.toggleActive();
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.toggleActive();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var triggerClassName = this.buildClassName('Menu__MenuTrigger ' + (this.context.active ? 'Menu__MenuTrigger__active' : 'Menu__MenuTrigger__inactive'));

	      return _react2.default.createElement(
	        'div',
	        {
	          className: triggerClassName,
	          onClick: this.handleClick.bind(this),
	          onKeyUp: this.handleKeyUp.bind(this),
	          onKeyDown: this.handleKeyDown.bind(this),
	          tabIndex: '0',
	          role: 'button',
	          'aria-label': this.props.label,
	          'aria-owns': this.context.id,
	          'aria-haspopup': 'true'
	        },
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'contextTypes',
	    get: function get() {
	      return {
	        id: _react2.default.PropTypes.string,
	        active: _react2.default.PropTypes.bool,
	        label: _react2.default.PropTypes.string
	      };
	    }
	  }]);

	  return MenuTrigger;
	}(_react2.default.Component);

	exports.default = MenuTrigger;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (baseName) {
	  var name = baseName;
	  if (this.props.className) {
	    name += ' ' + this.props.className;
	  }
	  return name;
	};

	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _MenuOption = __webpack_require__(7);

	var _MenuOption2 = _interopRequireDefault(_MenuOption);

	var _buildClassName = __webpack_require__(5);

	var _buildClassName2 = _interopRequireDefault(_buildClassName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuOptions = function (_React$Component) {
	  _inherits(MenuOptions, _React$Component);

	  _createClass(MenuOptions, null, [{
	    key: 'contextTypes',
	    get: function get() {
	      return {
	        id: _react2.default.PropTypes.string,
	        active: _react2.default.PropTypes.bool
	      };
	    }
	  }]);

	  function MenuOptions(props, context) {
	    _classCallCheck(this, MenuOptions);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuOptions).call(this, props, context));

	    _this.buildClassName = _buildClassName2.default;


	    _this.state = {
	      activeIndex: 0
	    };
	    return _this;
	  }

	  _createClass(MenuOptions, [{
	    key: 'onSelectionMade',
	    value: function onSelectionMade() {
	      this.props.onSelectionMade();
	    }
	  }, {
	    key: 'moveSelectionUp',
	    value: function moveSelectionUp() {
	      this.updateFocusIndexBy(-1);
	    }
	  }, {
	    key: 'moveSelectionDown',
	    value: function moveSelectionDown() {
	      this.updateFocusIndexBy(1);
	    }
	  }, {
	    key: 'handleKeys',
	    value: function handleKeys(e) {
	      var options = {
	        'ArrowDown': this.moveSelectionDown,
	        'ArrowUp': this.moveSelectionUp,
	        'Escape': this.closeMenu
	      };
	      if (options[e.key]) {
	        options[e.key].call(this);
	        e.preventDefault();
	        e.stopPropagation();
	      }
	    }
	  }, {
	    key: 'normalizeSelectedBy',
	    value: function normalizeSelectedBy(delta, numOptions) {
	      this.selectedIndex += delta;
	      if (this.selectedIndex > numOptions - 1) {
	        this.selectedIndex = 0;
	      } else if (this.selectedIndex < 0) {
	        this.selectedIndex = numOptions - 1;
	      }
	    }
	  }, {
	    key: 'focusOption',
	    value: function focusOption(index) {
	      this.selectedIndex = index;
	      this.updateFocusIndexBy(0);
	    }
	  }, {
	    key: 'updateFocusIndexBy',
	    value: function updateFocusIndexBy(delta) {
	      var _this2 = this;

	      var optionNodes = _reactDom2.default.findDOMNode(this).children;
	      this.normalizeSelectedBy(delta, optionNodes.length);
	      this.setState({ activeIndex: this.selectedIndex }, function () {
	        optionNodes[_this2.selectedIndex].focus();
	      });
	    }
	  }, {
	    key: 'renderOptions',
	    value: function renderOptions() {
	      var _this3 = this;

	      var index = 0;
	      return _react2.default.Children.map(this.props.children, function (c) {
	        var clonedOption = c;
	        if (c.type === _MenuOption2.default) {
	          var active = _this3.state.activeIndex === index;
	          clonedOption = _react2.default.cloneElement(c, {
	            active: active,
	            index: index,
	            _internalFocus: _this3.focusOption.bind(_this3, index),
	            _internalSelect: _this3.onSelectionMade.bind(_this3)
	          });
	          index++;
	        }
	        return clonedOption;
	      });
	    }
	  }, {
	    key: 'buildName',
	    value: function buildName() {
	      var cn = this.buildClassName('Menu__MenuOptions');
	      cn += ' Menu__MenuOptions--horizontal-' + this.props.horizontalPlacement;
	      cn += ' Menu__MenuOptions--vertical-' + this.props.verticalPlacement;
	      return cn;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          id: this.context.id,
	          role: 'menu',
	          tabIndex: '-1',
	          'aria-expanded': this.context.active,
	          style: { visibility: this.context.active ? 'visible' : 'hidden' },
	          className: this.buildName(),
	          onKeyDown: this.handleKeys.bind(this)
	        },
	        this.renderOptions()
	      );
	    }
	  }]);

	  return MenuOptions;
	}(_react2.default.Component);

	exports.default = MenuOptions;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _Menu = __webpack_require__(1);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _buildClassName = __webpack_require__(5);

	var _buildClassName2 = _interopRequireDefault(_buildClassName);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuOption = function (_React$Component) {
	  _inherits(MenuOption, _React$Component);

	  function MenuOption() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, MenuOption);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MenuOption)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.buildClassName = _buildClassName2.default, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(MenuOption, [{
	    key: 'notifyDisabledSelect',
	    value: function notifyDisabledSelect() {
	      if (this.props.onDisabledSelect) {
	        this.props.onDisabledSelect();
	      }
	    }
	  }, {
	    key: 'onSelect',
	    value: function onSelect() {
	      if (this.props.disabled) {
	        this.notifyDisabledSelect();
	        //early return if disabled
	        return;
	      } else if (this.props.onSelect) {
	        this.props.onSelect();
	      } else if (this.props.link) {
	        this.props.link.click();
	      } else if (this.props.children.type === _Menu2.default) {
	        _reactDom2.default.findDOMNode(this).querySelector('.Menu__MenuTrigger').click();
	        return;
	      }

	      this.props._internalSelect();
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
	      if (e.key === ' ') {
	        this.onSelect();
	      }
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      if (e.key === 'Enter') {
	        this.onSelect();
	      }
	    }
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.onSelect();
	    }
	  }, {
	    key: 'handleHover',
	    value: function handleHover() {
	      if (!this.refs.option.contains(document.activeElement)) {
	        this.props._internalFocus();
	        if (this.props.children.type === _Menu2.default) {
	          _reactDom2.default.findDOMNode(this).querySelector('.Menu__MenuTrigger').click();
	        }
	      }
	    }
	  }, {
	    key: 'buildName',
	    value: function buildName() {
	      var name = this.buildClassName('Menu__MenuOption');
	      if (this.props.active) {
	        name += ' Menu__MenuOption--active';
	      }
	      if (this.props.disabled) {
	        name += ' Menu__MenuOption--disabled';
	      }
	      return name;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        {
	          onClick: this.handleClick.bind(this),
	          onKeyUp: this.handleKeyUp.bind(this),
	          onKeyDown: this.handleKeyDown.bind(this),
	          onMouseOver: this.handleHover.bind(this),
	          className: this.buildName(),
	          role: 'menuitem',
	          tabIndex: '-1',
	          'aria-disabled': this.props.disabled,
	          ref: 'option'
	        },
	        this.props.children
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    get: function get() {
	      return {
	        active: _react2.default.PropTypes.bool,
	        onSelect: _react2.default.PropTypes.func,
	        onDisabledSelect: _react2.default.PropTypes.func,
	        disabled: _react2.default.PropTypes.bool,
	        link: _react2.default.PropTypes.object,
	        _internalSelect: _react2.default.PropTypes.func,
	        _internalFocus: _react2.default.PropTypes.func
	      };
	    }
	  }]);

	  return MenuOption;
	}(_react2.default.Component);

	exports.default = MenuOption;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  return 'react-menu-' + count++;
	};

	var count = 0;
	;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function () {
	  (0, _jsStylesheet2.default)({
	    '.Menu': {
	      position: 'relative'
	    },
	    '.Menu__MenuOptions': {
	      border: '1px solid #ccc',
	      'border-radius': '3px',
	      background: '#FFF',
	      position: 'absolute'
	    },
	    '.Menu__MenuOption': {
	      padding: '5px',
	      'border-radius': '2px',
	      outline: 'none',
	      cursor: 'pointer'
	    },
	    '.Menu__MenuOption--disabled': {
	      'background-color': '#eee'
	    },
	    '.Menu__MenuOption--active': {
	      'background-color': '#0aafff'
	    },
	    '.Menu__MenuOption--active.Menu__MenuOption--disabled': {
	      'background-color': '#ccc'
	    },
	    '.Menu__MenuTrigger': {
	      border: '1px solid #ccc',
	      'border-radius': '3px',
	      padding: '5px',
	      background: '#FFF'
	    },
	    '.Menu__MenuOptions--horizontal-left': {
	      right: '0px'
	    },
	    '.Menu__MenuOptions--horizontal-right': {
	      left: '0px'
	    },
	    '.Menu__MenuOptions--vertical-top': {
	      bottom: '45px'
	    },
	    '.Menu__MenuOptions--vertical-bottom': {}
	  });
	};

	var _jsStylesheet = __webpack_require__(10);

	var _jsStylesheet2 = _interopRequireDefault(_jsStylesheet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	!(function() {
	  function jss(blocks) {
	    var css = [];
	    for (var block in blocks)
	      css.push(createStyleBlock(block, blocks[block]));
	    injectCSS(css);
	  }

	  function createStyleBlock(selector, rules) {
	    return selector + ' {\n' + parseRules(rules) + '\n}';
	  }

	  function parseRules(rules) {
	    var css = [];
	    for (var rule in rules)
	      css.push('  '+rule+': '+rules[rule]+';');
	    return css.join('\n');
	  }

	  function injectCSS(css) {
	    var style = document.getElementById('jss-styles');
	    if (!style) {
	      style = document.createElement('style');
	      style.setAttribute('id', 'jss-styles');
	      var head = document.getElementsByTagName('head')[0];
	      head.insertBefore(style, head.firstChild);
	    }
	    var node = document.createTextNode(css.join('\n\n'));
	    style.appendChild(node);
	  }

	  if (true)
	    module.exports = jss;
	  else
	    window.jss = jss;

	})();



/***/ }
/******/ ])
});
;