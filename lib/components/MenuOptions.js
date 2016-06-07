'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MenuOption = require('./MenuOption');

var _MenuOption2 = _interopRequireDefault(_MenuOption);

var _buildClassName = require('../mixins/buildClassName');

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