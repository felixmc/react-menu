import React from 'react';
import ReactDOM from 'react-dom';

import MenuTrigger from './MenuTrigger';
import MenuOptions from './MenuOptions';
import MenuOption from './MenuOption';
import uuid from '../helpers/uuid';
import injectCSS from '../helpers/injectCSS';
import buildClassName from '../mixins/buildClassName';

export default class Menu extends React.Component {
  static injectCSS = injectCSS

  static get propTypes() {
    return {
      children: (props, propName, componentName) => {
        const prop = props[propName];
        const error = new Error('react-menu can only take two children, a MenuTrigger, and a MenuOptions');

        let ok = React.Children.count(prop) === 2;
        if (!ok) return error;

        React.Children.forEach(prop, (child) => {
          if (child.type !== MenuOptions && child.type !== MenuTrigger) {
            ok = false;
          }
        });

        if (!ok) return error;
      }
    }
  }

  static get childContextTypes() {
    return {
      id: React.PropTypes.string,
      active: React.PropTypes.bool
    }
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      id: uuid(),
      active: false,
      selectedIndex: 0,
      horizontalPlacement: 'right', // only 'right' || 'left'
      verticalPlacement: 'bottom' // only 'top' || 'bottom'
    };
  }

  buildClassName = buildClassName

  getChildContext() {
    return {
      id: this.state.id,
      active: this.state.active
    };
  }

  closeMenu(skipFocus) {
    this.setState({active: false}, () => {
      if (!skipFocus)
        this.focusTrigger()
    });
  }

  focusTrigger() {
    ReactDOM.findDOMNode(this.refs.trigger).focus();
  }

  handleBlur(e) {
    const self = this;
    // give next element a tick to take focus
    setTimeout(() => {
      if (!ReactDOM.findDOMNode(self).contains(document.activeElement)) {
        self.closeMenu(true);
      }
    }, 1);
  }

  handleTriggerToggle() {
    this.setState({active: !this.state.active}, this.afterTriggerToggle);
  }

  afterTriggerToggle() {
    if (this.state.active) {
      this.refs.options.focusOption(0);
      this.updatePositioning();
    }
  }

  updatePositioning() {
    const triggerRect = ReactDOM.findDOMNode(this.refs.trigger).getBoundingClientRect();
    const optionsRect = ReactDOM.findDOMNode(this.refs.options).getBoundingClientRect();
    const positionState = {};
    // horizontal = left if it wont fit on left side
    if (triggerRect.left + optionsRect.width > window.innerWidth) {
      positionState.horizontalPlacement = 'left';
    } else {
      positionState.horizontalPlacement = 'right';
    }
    if (triggerRect.top + optionsRect.height > window.innerHeight) {
      positionState.verticalPlacement = 'top';
    } else {
      positionState.verticalPlacement = 'bottom';
    }
    this.setState(positionState);
  }

  handleKeys(e) {
    if (e.key === 'Escape') {
      this.closeMenu();
    }
  }

  renderTrigger() {
    let trigger;
    const self = this;

    React.Children.forEach(this.props.children, (child) => {
      if (child.type === MenuTrigger) {
        trigger = React.cloneElement(child, {
          ref: 'trigger',
          onToggleActive: self.handleTriggerToggle.bind(self)
        });
      }
    })

    return trigger;
  }

  renderMenuOptions() {
    let options;
    const self = this;

    React.Children.forEach(this.props.children, (child) => {
      if (child.type === MenuOptions) {
        options = React.cloneElement(child, {
          ref: 'options',
          horizontalPlacement: self.state.horizontalPlacement,
          verticalPlacement: self.state.verticalPlacement,
          onSelectionMade: self.closeMenu.bind(self)
        });
      }
    })

    return options;
  }

  render() {
    return (
      <div
        className={this.buildClassName('Menu')}
        onKeyDown={this.handleKeys.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      >
        {this.renderTrigger()}
        {this.renderMenuOptions()}
      </div>
    )
  }
}
