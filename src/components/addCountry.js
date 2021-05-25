import React, { Component } from 'react';
import Web3 from 'web3'
import '../css/countries.css'

import { COUNTRY_ABI, COUNTRY_ADDRESS } from '../config.js'


class NewCountry extends Component {

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

    this.addData = this.addData.bind(this)
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


    const countryData = new web3.eth.Contract(COUNTRY_ABI, COUNTRY_ADDRESS)

    this.setState({ countryData })

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    this.setState({ account: account, balance: balance, loading: false })
  }


   addData(name, total, perCap, epi, eh, ev) {

     this.state.countryData.methods.addCountry(name, total, perCap, epi, eh, ev).send({ from: this.state.account })
   }

 
  render() {
    return (

      <div className = "mainForm">

        <hr />

        <h1> Add Data </h1>

        <div className = "formDiv">

          <form className = "sendForm" onSubmit={(event) => {
            event.preventDefault()
            this.addData(this.newName.value, this.newTotal.value, this.newPerCap.value, this.newEPI.value, this.newEH.value, this.newEV.value)
            }}>

            <input ref={(input) => this.newName = input} type="text" className="addCountryForm" placeholder="Name" required />
            <input ref={(input) => this.newTotal = input} type="number" className="addCountryForm" placeholder="Total CO2" />
            <input ref={(input) => this.newPerCap = input} type="number" className="addCountryForm" placeholder="CO2 Per Capita" />
            <input ref={(input) => this.newEPI = input} type="number" className="addCountryForm" placeholder="Env. Performance" />
            <input ref={(input) => this.newEH = input} type="number" className="addCountryForm" placeholder="Env. Health" />
            <input ref={(input) => this.newEV = input} type="number" className="addCountryForm" placeholder="Eco Vitality" />


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

export default NewCountry;
