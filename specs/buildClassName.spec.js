import React from 'react';
import ReactDOM from 'react-dom';
import {equal} from 'assert';

import buildClassName from '../src/mixins/buildClassName';

class MockComponent extends React.Component {
  buildClassName = buildClassName

  render() {
    return (
      React.createElement('div', {
        className: this.buildClassName('foo')
      })
    )
  }
}

describe('buildClassName', () => {

  it('includes the name passed in', () => {
    const _currentDiv = document.createElement('div');
    const menu = ReactDOM.render(React.createElement(MockComponent), _currentDiv);
    equal(ReactDOM.findDOMNode(menu).className, 'foo');
  });

  it('concatenates existing classNames passed in', () => {
    const _currentDiv = document.createElement('div');
    const menu = ReactDOM.render(React.createElement(MockComponent, {
      className: 'bar'
    }), _currentDiv);
    equal(ReactDOM.findDOMNode(menu).className, 'foo bar');
  });

});
