import React, { Component } from "react";
import Web3 from "web3";

import { JOB_ABI, JOB_ADDRESS } from "../config.js";

class Jobs extends Component {
  async componentWillMount() {
    await this.runWeb3();
    await this.blockchain();
    await this.getData();
    this.forceUpdate();
  }

  componentDidMount() {
    document.title = "Raid Guild Job Board";
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      balance: "",
      jobs: [],
      headers: [
        "ID",
        "Timestamp",
        "Owner",
        "Title",
        "Description",
        "Active workers",
        "Edit",
      ],
      loading: true,
      showHistory: false,
      editing: false,
      updating: 0,
    };

    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.editing = this.editing.bind(this);
  }

  async isInstalled() {
    if (typeof Web3 !== "undefined") {
      console.log("Web3 Provider is installed");
    } else {
      console.log("No Web3 Provider!");
    }
  }

  async isLocked(web3) {
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        console.log(err);
      } else if (accounts.length === 0) {
        console.log("Web3 Provider is locked");
      } else {
        console.log("Web3 Provider is unlocked");
      }
    });
  }

  async runWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. Please install MetaMask or similar!"
      );
    }
  }

  async blockchain() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    this.isInstalled();
    this.isLocked(web3);

    const jobData = new web3.eth.Contract(JOB_ABI, JOB_ADDRESS);

    this.setState({ jobData });

    const accounts = await web3.eth.getAccounts();
    const balanceInWei = await web3.eth.getBalance(accounts[0]);
    var balance = balanceInWei / 1000000000000000000;
    var account = accounts[0];

    console.log("Account: " + account);
    console.log("Balance: " + balance);

    this.setState({
      account: accounts[0],
      balance: balance,
      loading: false,
      editing: false,
    });
  }

  async getData() {
    //this.setState({ jobs: [] });

    var jobCount = await this.state.jobData.methods.jobCount().call();

    for (var i = 0; i < jobCount; i++) {
      const singleJob = await this.state.jobData.methods.jobs(i).call();
      this.setState({
        jobs: [...this.state.jobs, singleJob],
      });
    }
  }

  // async updateCountry(id, name, total, perCap, epi, eh, ev) {

  //   this.setState({loading:false})

  //   this.state.countryData.methods.updateCountry(id, name, total, perCap, epi, eh, ev).send({ from: this.state.account }).once('receipt', (receipt) => {
  //       this.setState({ editing: false })
  //       this.getData()
  //     })

  //   this.setState({loading:true})

  // }


   //async updateJobs(id, name, total, perCap, epi, eh, ev) {

  //   this.setState({loading:false})

     //this.state.jobData.methods.updateJobs(id, name, total, perCap, epi, eh, ev).send({ from: this.state.account }).once('receipt', (receipt) => {
  //       this.setState({ editing: false })
//         this.getData()
  //     })

  //   this.setState({loading:true})

   //}

  /*
  { this.state.loading
    ? <div id="loader" className=""><p className="">Communicating with blockchain...</p></div>
    : <Thought
      thoughts={this.state.thoughts}
      createThought={this.createThought}
      hand = {this.state.currentHandle}
      acct = {this.state.account}
     />

  }
  */

  editing(job) {
    this.setState({ updating: job });
    this.setState({ editing: true });
  }

  // renderEditData(toUpdate) {

  //     return this.state.jobs.map((eachJob, index) => {
  //        const { id, creationTimestamp, owner, workers, title, description } = eachJob //destructuring

  //        if (id == toUpdate) {
  //          return (
  //               <tr key={id}>
  //                  <td>{id}</td>

  //                  <td>{country}</td>

  //                  <td>
  //                   <form className = "sendForm" id="updateCountryForm" onSubmit={(event) => {
  //                    event.preventDefault()
  //                    this.updateCountry(id, country, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
  //                   }}>
  //                     <input ref={(input) => this.newTotal = input} type="text" className="addCountryForm" defaultValue={totalCO2} required />
  //                   </form>
  //                  </td>

  //                  <td>
  //                    <form className = "sendForm" id="updateCountryForm" onSubmit={(event) => {
  //                     event.preventDefault()
  //                     this.updateCountry(id, country, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
  //                    }}>
  //                      <input ref={(input) => this.newPerCap = input} type="text" className="addCountryForm" defaultValue={perCapCO2} required />
  //                    </form>
  //                  </td>

  //                  <td>
  //                    <form className = "sendForm" id="updateCountryForm" onSubmit={(event) => {
  //                     event.preventDefault()
  //                     this.updateCountry(id, country, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
  //                    }}>
  //                      <input ref={(input) => this.newEPI = input} type="text" className="addCountryForm" defaultValue={envPerfIndex} required />
  //                    </form>
  //                  </td>

  //                  <td>
  //                    <form className = "sendForm" id="updateCountryForm" onSubmit={(event) => {
  //                     event.preventDefault()
  //                     this.updateCountry(id, country, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
  //                    }}>
  //                      <input ref={(input) => this.newEH = input} type="text" className="addCountryForm" defaultValue={envHealth} required />
  //                    </form>
  //                  </td>

  //                  <td>
  //                    <form className = "sendForm" id="updateCountryForm" onSubmit={(event) => {
  //                     event.preventDefault()
  //                     this.updateCountry(id, country, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
  //                    }}>
  //                      <input ref={(input) => this.newEV = input} type="text" className="addCountryForm" defaultValue={ecoVitality} required />
  //                    </form>
  //                  </td>

  //                  <td>
  //                   <input type="submit" hidden={false} form="updateCountryForm"/>
  //                  </td>
  //               </tr>
  //          )
  //        }

  //        else {
  //          return (
  //             <tr key={id}>
  //                <td>{id}</td>
  //                <td>{country}</td>
  //                <td>{totalCO2}</td>
  //                <td>{perCapCO2}</td>
  //                <td>{envPerfIndex}</td>
  //                <td>{envHealth}</td>
  //                <td>{ecoVitality}</td>
  //                <td>
  //                 <button> Submit </button>
  //                </td>
  //             </tr>
  //          )
  //        }
  //     })
  //  }


  renderTableData() {
    return this.state.jobs.map((eachJob, index) => {
      const { id, creationTimestamp, owner, title, description, active, workers } =
        eachJob; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{creationTimestamp}</td>
          <td>{owner}</td>
          <td>{title}</td>
          <td>{description}</td>
          <td>{active}</td>
          <td>{workers}</td>
          <td>
            <button onClick={() => this.editing(id)}> Edit </button>
          </td>
        </tr>
      );
    });
  }

  /*
   async renderTableHeader() {
      let header = Object.keys(this.state.headers)
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }
   */

  renderTableHeader() {
    return this.state.headers.map((label, index) => {
      return <th key={label}>{label.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <div className="tableFlex">
            <h1 id="title">Jobs by Owner</h1>
            <table id="jobs" className="jobsTable">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>


                  {this.state.editing
                    ? this.renderTableData()
                    : this.renderTableData()}

              </tbody>
            </table>
          </div>

          <div className="paddedDiv" />
        </header>
      </div>
    );
  }
}

export default Jobs;
