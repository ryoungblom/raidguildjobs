import React, { Component } from 'react';
import { JOB_ADDRESS } from '../config';


class Help extends Component {

  componentDidMount(){
    document.title = "Raid Guild Job Board"
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
            RaidGuild Job Board currently runs on the Mtic Mumbai testnet (Contract: {JOB_ADDRESS}). <br />
            A local build can also be run via the source code.
          </p>

        </header>
      </div>

    );
  }
}

export default Help;
