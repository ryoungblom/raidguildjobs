import React, { Component } from 'react';
import logo from '../assets/raidguild_logo.png';


class Error extends Component {

  componentDidMount(){
    document.title = "Whoops..."
  }

  render() {
    return (

      <div className="App">
        <header className="App-header">
          <p>
            On, no.
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            You've navigated to a non-existent page!
          </p>
          <a
            className="App-link"
            href="/"
          >
            Return to the Known.
          </a>
        </header>

      </div>

    );
  }
}

export default Error;
