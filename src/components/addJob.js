import React, { Component } from 'react';
import Web3 from 'web3'

import { JOB_ABI, JOB_ADDRESS } from '../config.js'


class NewJob extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
    this.forceUpdate()
  }


  componentDidMount(){
    document.title = "react-web3"
  }


  async componentWillUnmount() {
    clearInterval(this.interval);
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      loading: true
    }

    this.addJob = this.addJob.bind(this)
  }

  async runWeb3() {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask or similar!')
    }
  }


  async blockchain() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")


    const jobData = new web3.eth.Contract(JOB_ABI, JOB_ADDRESS)

    this.setState({ jobData })

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    this.setState({ account: account, balance: balance, loading: false })
  }


   addJob(name, desciption) {

     this.state.jobData.methods.addJob(name, desciption).send({ from: this.state.account })
   }

 
  render() {
    return (

      <div className = "mainForm">

        <hr />

        <h1> Add Data </h1>

        <div className = "formDiv">

          <form className = "sendForm" onSubmit={(event) => {
            event.preventDefault()
            this.addJob(this.newTitle.value, this.newDescription.value)
            }}>

            <input ref={(input) => this.newTitle = input} type="text" className="addJobForm" placeholder="Title" required />
            <input ref={(input) => this.newDescription = input} type="text" className="addJobForm" placeholder="Description" required />

            <br />
              <input type="submit" hidden={false} />
          </form>

        </div>

        <div className = "infoFlex">
          <span> &nbsp; </span>
          <span className="acctInfo">Account: {this.state.account}</span>
          <span className="acctInfo">Balance: @{this.state.balance}</span>
          <span> &nbsp; </span>
        </div>

      </div>

    );
  }
}

export default NewJob;
