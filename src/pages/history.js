import React, { Component } from 'react';
import '../App.css';
import '../css/history.css'
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
    document.title = "Climateth"
  }


  async componentWillUnmount() {
    clearInterval(this.interval);
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      countries: [],
      edits: [],
      historyHeaders: [
        "Name",
        "Show History"],
      headers: [
        "Total CO2 Emissions",
        "Per Capita CO2 Emissions",
        "Environmental Performance Index",
        "Environmental Health Index",
        "Eco Vitality Index",
        "Edit No.",
        "Time"],
      loading: true,
      current: "Carbon",
      showHistory: true,
      updating: 0
    }

    this.renderTableData = this.renderTableData.bind(this)
    this.renderTableHeader = this.renderTableHeader.bind(this)
    this.showEditHistory = this.showEditHistory.bind(this)
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

    this.setState({ account: accounts[0], balance: balance, loading: false })
  }


  async getEditData(editCount, country) {

    this.setState({ edits: [] })

    for (var i = 0; i < editCount; i++) {
      const singleCountry = await this.state.countryData.methods.returnCountry(i, country).call()
      this.setState({
        edits: [...this.state.edits, singleCountry]
      })

    }
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


  async showEditHistory(id, country) {

    this.setState({ showHistory: false })

    this.setState({ current: country })

    var editCount = await this.state.countryData.methods.returnCountryCount(id).call()

    this.getEditData(editCount, country)

  }

  renderTableData() {
      return this.state.countries.map((eachCountry, index) => {
         const { id, country, totalCO2, perCapCO2, envPerfIndex, envHealth, ecoVitality } = eachCountry //destructuring
         return (
            <tr key={id}>
               <td>{country}</td>
               <td>
                <button onClick={() => this.showEditHistory(id, country)}> History </button>
               </td>
            </tr>
         )
      })
   }


   renderTableEditData() {
       return this.state.edits.map((eachEditCountry, index) => {
          const { id, country, totalCO2, perCapCO2, envPerfIndex, envHealth, ecoVitality, changes, editTime } = eachEditCountry //destructuring

          var createDate = editTime
          var editDate = new Date (createDate * 1000)
          var newDate = editDate.toString()

          return (
             <tr key={id}>
                <td className="renderHistoryHeader">{totalCO2}</td>
                <td className="renderHistoryHeader">{perCapCO2}</td>
                <td className="renderHistoryHeader">{envPerfIndex}</td>
                <td className="renderHistoryHeader">{envHealth}</td>
                <td className="renderHistoryHeader">{ecoVitality}</td>
                <td className="renderHistoryHeader">{changes}</td>
                <td className="renderHistoryHeader">{newDate}</td>
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

   renderTableEditHeader() {
      return this.state.headers.map((label, index) => {
         return <th key={label} className="renderHistoryHeader">{label.toUpperCase()}</th>
      })
   }

   renderTableHeader() {
      return this.state.historyHeaders.map((label, index) => {
         return <th key={label}>{label.toUpperCase()}</th>
      })
   }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <div className = "centerFlex">
            <h1 id='title'>{this.state.current} Data History</h1>

            {this.state.showHistory ?
            <div className = "tableFlexHistory">
              <div>
                <table id='countries' className="countryTable">
                  <tbody>
                    <tr>{this.renderTableHeader()}</tr>

                      {this.renderTableData()}

                  </tbody>
                </table>
              </div>
            </div>

            :

            <div className = "tableFlexHistory">
              <div>
                <table id='countries' className="countryTable">
                  <tbody>
                    <tr>{this.renderTableHeader()}</tr>

                      {this.renderTableData()}

                  </tbody>
                </table>
              </div>

              <div>
                <div className="tablePadding">
                  <table id='countries' className="countryEditTable">
                    <tbody>
                      <tr>{this.renderTableEditHeader()}</tr>

                        {this.renderTableEditData()}

                    </tbody>
                  </table>
                </div>
              </div>

            </div>

              }

          </div>


          <div className="paddedDiv" />

        </header>

      </div>


    );
  }
}

export default History;
