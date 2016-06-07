'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _buildClassName = require('../mixins/buildClassName');

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