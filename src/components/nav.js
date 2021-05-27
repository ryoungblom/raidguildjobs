import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#ff3864'
  },
  bmBurgerBarsHover: {
    background: '#ff0940'
  }
}

class Navigation extends Component {
  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu styles={styles} right>
        <a className="menu-item" href="/">Home</a>
        <a className="menu-item" href="/companies">Companies</a>
        <a className="menu-item" href="/">Jobs</a>
        <a className="menu-item" href="/help">Help</a>
      </Menu>
    );
  }
}

export default Navigation
