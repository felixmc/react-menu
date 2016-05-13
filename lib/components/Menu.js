'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MenuTrigger = require('./MenuTrigger');

var _MenuTrigger2 = _interopRequireDefault(_MenuTrigger);

var _MenuOptions = require('./MenuOptions');

var _MenuOptions2 = _interopRequireDefault(_MenuOptions);

var _MenuOption = require('./MenuOption');

var _MenuOption2 = _interopRequireDefault(_MenuOption);

var _uuid = require('../helpers/uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _injectCSS = require('../helpers/injectCSS');

var _injectCSS2 = _interopRequireDefault(_injectCSS);

var _buildClassName = require('../mixins/buildClassName');

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
      var self = this;
      // give next element a tick to take focus
      setTimeout(function () {
        if (!_reactDom2.default.findDOMNode(self).contains(document.activeElement)) {
          self.closeMenu(true);
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
          onBlur: this.handleBlur.bind(this)
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