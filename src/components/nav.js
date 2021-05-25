import React, { Component } from 'react'
import { stack as Menu } from 'react-burger-menu'
import '../css/nav.css'

class Navigation extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="account" className="menu-item" href="/companies">Companies</a>
        <a id="contract" className="menu-item" href="/countries">Countries</a>
        <a id="history" className="menu-item" href="/history">History</a>
        <a id="contract" className="menu-item" href="/help">Help</a>
        {/*<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>*/}
      </Menu>
    );
  }
}

export default Navigation
