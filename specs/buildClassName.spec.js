require('./helper');
var React = require('react');
var ReactDOM = require('react-dom');
var buildClassName = require('../lib/mixins/buildClassName');

var MockComponent = React.createClass({
  mixins: [buildClassName],

  render: function (){
    return (
      React.createElement('div', {
        className: this.buildClassName('foo')
      })
    )
  }
});

describe('buildClassName', function () {

  it('includes the name passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = ReactDOM.render(React.createElement(MockComponent), _currentDiv);
    equal(ReactDOM.findDOMNode(menu).className, 'foo');
  });

  it('concatenates existing classNames passed in', function() {
    var _currentDiv = document.createElement('div');
    var menu = ReactDOM.render(React.createElement(MockComponent,{
      className: 'bar'
    }), _currentDiv);
    equal(ReactDOM.findDOMNode(menu).className, 'foo bar');
  });

});
