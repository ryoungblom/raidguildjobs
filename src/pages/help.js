import React, { Component } from 'react';
import '../App.css';


class Help extends Component {

  componentDidMount(){
    document.title = "Climateth"
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1>Quickstart Guide</h1>
          <p>
            Please make sure to have a Web3 provider (metamask or similar) in order to use this database.
          </p>

          <p>
            Climateth currently runs on the Ropsten testnet (Contract: 0x7f38B87C937fDE513616a78B37d3d4B10EB6cf6C). <br />
            A local build can also be run via the source code.
          </p>

        </header>
      </div>

    );
  }
}

export default Help;
