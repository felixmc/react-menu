import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {equal, ok} from 'assert';

import {renderMenu, unmountMenu} from './helper';

describe('Menu', () => {
  describe('a single menu', () => {

    let menu;

    beforeEach(() => {
      menu = renderMenu();
    });

    afterEach(() => {
      unmountMenu();
    });

    it('should hide menu options by default', () => {
      equal(ReactDOM.findDOMNode(menu.refs.options).style.visibility, 'hidden');
      equal(ReactDOM.findDOMNode(menu.refs.options).getAttribute('aria-expanded'), 'false');
      equal(ReactDOM.findDOMNode(menu.refs.options).style.visibility, 'hidden');
      ok(!menu.state.active);
    });

    it('should show menu options when trigger is clicked', () => {
      TestUtils.Simulate.click(ReactDOM.findDOMNode(menu.refs.trigger));
      equal(ReactDOM.findDOMNode(menu.refs.options).getAttribute('aria-expanded'), 'true');
      equal(ReactDOM.findDOMNode(menu.refs.options).style.visibility, 'visible');
      ok(menu.state.active);
    });

    it('should toggle menu options trigger on enter key', () => {
      TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(menu.refs.trigger), {key: 'Enter'});
      ok(menu.state.active);
    });

    it('should focus first option', () => {
      TestUtils.Simulate.click(ReactDOM.findDOMNode(menu.refs.trigger));
      equal(ReactDOM.findDOMNode(menu.refs.options).children[0], document.activeElement);
    });

    it('should have roles and aria attributes', () => {
      var trigger = ReactDOM.findDOMNode(menu.refs.trigger);
      var options = ReactDOM.findDOMNode(menu.refs.options);
      equal(trigger.getAttribute('aria-owns'), options.getAttribute('id'));
      equal(trigger.getAttribute('role'), 'button');
      equal(trigger.getAttribute('aria-haspopup'), 'true');
      equal(options.getAttribute('role'), 'menu');
      equal(options.getAttribute('aria-expanded'), 'false');
      equal(options.children[0].getAttribute('role'), 'menuitem');
    });

    it('should make menu option disabled', () => {
      equal(ReactDOM.findDOMNode(menu.refs.options).children[3].getAttribute('aria-disabled'), 'true');
    });

    // TODO: These tests aren't working for some reason
    // it('should change selectedIndex on keydown', () => {
    //   TestUtils.Simulate.click(ReactDOM.findDOMNode(menu.refs.trigger));
    //   TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(menu.refs.options), {key: 'ArrowDown'});
    //   equal(menu.state.selectedIndex, 1);
    // });

    // it('should select menu option on enter', () => {
    //   TestUtils.Simulate.click(ReactDOM.findDOMNode(menu.refs.trigger));
    //   TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(menu.refs.options).children[1], {key: 'Enter'});
    //   equal(menu.state.selectedIndex, 1);
    // });
  });

  describe('multiple menus', () => {

    let menuA, menuB, containerA, containerB;

    beforeEach(() => {
      containerA = document.createElement('div');
      containerB = document.createElement('div');

      document.body.appendChild(containerA);
      document.body.appendChild(containerB);

      menuA = renderMenu(containerA);
      menuB = renderMenu(containerB);
    });

    afterEach(() => {
      unmountMenu(containerA);
      unmountMenu(containerB);
    });

    it('should close the active menu when clicking another menu', (done) => {
      TestUtils.Simulate.click(ReactDOM.findDOMNode(menuA.refs.trigger));
      ok(menuA.state.active);

      TestUtils.Simulate.click(ReactDOM.findDOMNode(menuB.refs.trigger));
      // Unfortunate implementation detail that `active` is not reset until the next execution cycle
      setTimeout(() => {
        ok(!menuA.state.active);
        ok(menuB.state.active);
        done();
      }, 1);
    });
  });
});
