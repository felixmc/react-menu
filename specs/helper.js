import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Menu from '../src/components/Menu';
import MenuTrigger from '../src/components/MenuTrigger';
import MenuOptions from '../src/components/MenuOptions';
import MenuOption from '../src/components/MenuOption';

function renderMenu(container) {
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

function unmountMenu(container) {
  container = container || document.body;
  ReactDOM.unmountComponentAtNode(container);
};

export {renderMenu, unmountMenu}
