import React from 'react';

import buildClassName from '../mixins/buildClassName';

export default class MenuOption extends React.Component {
  static get propTypes() {
    return {
      active: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      onDisabledSelect: React.PropTypes.func,
      disabled: React.PropTypes.bool,
      _internalSelect: React.PropTypes.func,
      _internalFocus: React.PropTypes.func
    }
  }

  buildClassName = buildClassName

  notifyDisabledSelect() {
    if (this.props.onDisabledSelect) {
      this.props.onDisabledSelect();
    }
  }

  onSelect() {
    if (this.props.disabled) {
      this.notifyDisabledSelect();
      //early return if disabled
      return;
    }
    if (this.props.onSelect) {
      this.props.onSelect();
    }
    this.props._internalSelect();
  }

  handleKeyUp(e) {
    if (e.key === ' ') {
      this.onSelect();
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.onSelect();
    }
  }

  handleClick() {
    this.onSelect();
  }

  handleHover() {
    this.props._internalFocus();
  }

  buildName() {
    let name = this.buildClassName('Menu__MenuOption');
    if (this.props.active) {
      name += ' Menu__MenuOption--active';
    }
    if (this.props.disabled) {
      name += ' Menu__MenuOption--disabled';
    }
    return name;
  }

  render() {
    return (
      <div
        onClick={this.handleClick.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        onMouseOver={this.handleHover.bind(this)}
        className={this.buildName()}
        role='menuitem'
        tabIndex='-1'
        aria-disabled={this.props.disabled}
      >
        {this.props.children}
      </div>
    )
  }
}
