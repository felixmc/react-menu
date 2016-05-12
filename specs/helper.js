assert = require('assert');
React = require('react');
ReactDOM = require('react-dom');
TestUtils = require('react-addons-test-utils');
var Menu = require('../src/components/Menu');
var MenuTrigger = require('../src/components/MenuTrigger');
var MenuOptions = require('../src/components/MenuOptions');
var MenuOption = require('../src/components/MenuOption');

ok = assert.ok;
equal = assert.equal;
strictEqual = assert.strictEqual;
throws = assert.throws;

var _menuNode;
renderMenu = function(container) {
  container = container || document.body;

  return ReactDOM.render((
    <Menu>
      <MenuTrigger>I am the trigger, goo goo goo joob</MenuTrigger>
      <MenuOptions>
        <MenuOption>Foo</MenuOption>
        <MenuOption>Bar</MenuOption>
        <MenuOption>Baz</MenuOption>
        <MenuOption disabled={true}>Disabled</MenuOption>
      </MenuOptions>
    </Menu>
  ), container);
};

unmountMenu = function(container) {
  container = container || document.body;
  ReactDOM.unmountComponentAtNode(container);
};

