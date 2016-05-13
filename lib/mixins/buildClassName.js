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