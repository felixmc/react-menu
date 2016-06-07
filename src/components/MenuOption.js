import React from 'react';
import ReactDOM from 'react-dom';

import Menu from './Menu';
import buildClassName from '../mixins/buildClassName';

export default class MenuOption extends React.Component {
  static get propTypes() {
    return {
      active: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      onDisabledSelect: React.PropTypes.func,
      disabled: React.PropTypes.bool,
      link: React.PropTypes.object,
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
      this.notifyDisabledSelect()
      //early return if disabled
      return
    } else if (this.props.onSelect) {
      this.props.onSelect()
    } else if (this.props.link) {
      this.props.link.click()
    } else if (this.props.children.type === Menu) {
      ReactDOM.findDOMNode(this).querySelector('.Menu__MenuTrigger').click()
      return
    }

    this.props._internalSelect()
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
    if (!this.refs.option.contains(document.activeElement)) {
      this.props._internalFocus()
      if (this.props.children.type === Menu) {
        ReactDOM.findDOMNode(this).querySelector('.Menu__MenuTrigger').click()
      }
    }
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
        ref='option'
      >
        {this.props.children}
      </div>
    )
  }
}
