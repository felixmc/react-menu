import React from 'react';
import ReactDOM from 'react-dom';

import MenuOption from './MenuOption';
import buildClassName from '../mixins/buildClassName';

export default class MenuOptions extends React.Component {
  static get contextTypes() {
    return {
      id: React.PropTypes.string,
      active: React.PropTypes.bool
    }
  }

  buildClassName = buildClassName

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIndex: 0
    };
  }

  onSelectionMade() {
    this.props.onSelectionMade();
  }

  moveSelectionUp() {
    this.updateFocusIndexBy(-1);
  }

  moveSelectionDown() {
    this.updateFocusIndexBy(1);
  }

  handleKeys(e) {
    const options = {
      'ArrowDown': this.moveSelectionDown,
      'ArrowUp': this.moveSelectionUp,
      'Escape': this.closeMenu
    }
    if (options[e.key]) {
      options[e.key].call(this);
    }
  }

  normalizeSelectedBy(delta, numOptions) {
    this.selectedIndex += delta;
    if (this.selectedIndex > numOptions - 1) {
      this.selectedIndex = 0;
    } else if (this.selectedIndex < 0) {
      this.selectedIndex = numOptions - 1;
    }
  }

  focusOption(index) {
    this.selectedIndex = index;
    this.updateFocusIndexBy(0);
  }

  updateFocusIndexBy(delta) {
    const optionNodes = ReactDOM.findDOMNode(this).querySelectorAll('.Menu__MenuOption');
    this.normalizeSelectedBy(delta, optionNodes.length);
    this.setState({activeIndex: this.selectedIndex}, () => {
      optionNodes[this.selectedIndex].focus();
    });
  }

  renderOptions() {
    const self = this;
    let index = 0;
    return React.Children.map(this.props.children, (c) => {
      let clonedOption = c;
      if (c.type === MenuOption) {
        const active = self.state.activeIndex === index;
        clonedOption = React.cloneElement(c, {
          active: active,
          index: index,
          _internalFocus: self.focusOption.bind(self, index),
          _internalSelect: self.onSelectionMade.bind(self)
        });
        index++;
      }
      return clonedOption;
    });
  }

  buildName() {
    let cn = this.buildClassName('Menu__MenuOptions');
    cn += ' Menu__MenuOptions--horizontal-' + this.props.horizontalPlacement;
    cn += ' Menu__MenuOptions--vertical-' + this.props.verticalPlacement;
    return cn;
  }

  render() {
    return (
      <div
        id={this.context.id}
        role='menu'
        tabIndex='-1'
        aria-expanded={this.context.active}
        style={{visibility: this.context.active ? 'visible' : 'hidden'}}
        className={this.buildName()}
        onKeyDown={this.handleKeys.bind(this)}
      >
        {this.renderOptions()}
      </div>
    )
  }
}
