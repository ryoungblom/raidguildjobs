import React, { Component } from 'react';
import '../App.css';
import '../css/countries.css'
import Web3 from 'web3'

import { COUNTRY_ABI, COUNTRY_ADDRESS } from '../config.js'


class History extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
    await this.getData()
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
      members: [],
      headers: [],
      loading: true,
    }

    this.renderTableData = this.renderTableData.bind(this)
    this.renderTableHeader = this.renderTableHeader.bind(this)
  }


  async isInstalled() {
     if (typeof Web3 !== 'undefined'){
        console.log('Web3 Provider is installed')
     }
     else{
        console.log('No Web3 Provider!')
     }
  }

  async isLocked(web3) {
     web3.eth.getAccounts(function(err, accounts){
        if (err != null) {
           console.log(err)
        }
        else if (accounts.length === 0) {
           console.log('Web3 Provider is locked')
        }
        else {
           console.log('Web3 Provider is unlocked')
        }
     });
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

    this.isInstalled();
    this.isLocked(web3);

    const countryData = new web3.eth.Contract(COUNTRY_ABI, COUNTRY_ADDRESS)

    this.setState({ countryData })

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    console.log("Account: " + account)
    console.log("Balance: " + balance)

    this.setState({ account: accounts[0], balance: balance, loading: false, editing: false })
  }


  async getData() {

    var countryCount = await this.state.countryData.methods.countryCount().call()

    for (var i = 0; i < countryCount; i++) {
      const singleCountry = await this.state.countryData.methods.countries(i).call()
      this.setState({
        countries: [...this.state.countries, singleCountry]
      })
    }
  }


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


  renderTableData() {
      return this.state.countries.map((eachCountry, index) => {
         const { id, country, totalCO2, perCapCO2, envPerfIndex, envHealth, ecoVitality } = eachCountry //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{country}</td>
               <td>{totalCO2}</td>
               <td>{perCapCO2}</td>
               <td>{envPerfIndex}</td>
               <td>{envHealth}</td>
               <td>{ecoVitality}</td>
            </tr>
         )
      })
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
         return <th key={label}>{label.toUpperCase()}</th>
      })
   }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <div className = "tableFlex">
            <h1 id='title'>History</h1>
            <table id='history' className="countryTable">
              <tbody>
                <tr>{this.renderTableHeader()}</tr>

                  {this.renderTableData()}

              </tbody>
            </table>
          </div>
        </header>
      </div>


    );
  }
}

export default History;
