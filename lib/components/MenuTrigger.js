'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buildClassName = require('../mixins/buildClassName');

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
        active: _react2.default.PropTypes.bool
      };
    }
  }]);

  return MenuTrigger;
}(_react2.default.Component);

exports.default = MenuTrigger;