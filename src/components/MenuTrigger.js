import React from 'react';

import buildClassName from '../mixins/buildClassName';

export default class MenuTrigger extends React.Component {
  static get contextTypes() {
    return {
      id: React.PropTypes.string,
      active: React.PropTypes.bool,
      label: React.PropTypes.string
    }
  }

  buildClassName = buildClassName

  toggleActive() {
    this.props.onToggleActive(!this.context.active);
  }

  handleKeyUp(e) {
    if (e.key === ' ')
      this.toggleActive();
  }

  handleKeyDown(e) {
    if (e.key === 'Enter')
      this.toggleActive();
  }

  handleClick() {
    this.toggleActive();
  }

  render() {
    const triggerClassName =
      this.buildClassName(
        'Menu__MenuTrigger ' +
        (this.context.active
        ? 'Menu__MenuTrigger__active'
        : 'Menu__MenuTrigger__inactive')
      );

    return (
      <div
        className={triggerClassName}
        onClick={this.handleClick.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        tabIndex='0'
        role='button'
        aria-label={this.props.label}
        aria-owns={this.context.id}
        aria-haspopup='true'
      >
        {this.props.children}
      </div>
    )
  }
}
