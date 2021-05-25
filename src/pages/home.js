import React, { Component } from 'react';
import logo from '../assets/boilerplate/logo.svg';
import '../css/home.css';
import Web3 from 'web3'


class Home extends Component {

  async componentWillMount() {
    await this.runWeb3()
    await this.blockchain()
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
      web3: false,
      loading: true
    }
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
      this.setState({ web3: true })
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({ web3: true })
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install an Ethereum provider!')
    }
  }


  async blockchain() {

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    this.isInstalled();
    this.isLocked(web3);

    const accounts = await web3.eth.getAccounts()
    const balanceInWei = await web3.eth.getBalance(accounts[0])
    var balance = balanceInWei/1000000000000000000
    var account = accounts[0]

    console.log("Account: " + account)
    console.log("Balance: " + balance)

    console.log("web3: " + web3)

    this.setState({ account: accounts[0], balance: balance, loading: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        {this.state.web3 ?
          <div>
            <p>
              Welcome to <code>Climateth</code><br />
              An Extra-Jurisdictional Carbon Emissions Database
            </p>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Carbon data currently stored on the Ropsten (Ethereum) testnet.
            </p>
            <a
              className="App-link"
              href="https://github.com/ryoungblom/climateth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>

          :

          <div>
            <p>
              Welcome to <code>Climateth</code> <br />
              An Extra-Jurisdictional Carbon Emissions Database.
            </p>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              It looks like you don't have an Ethereum provider...<br />
              Please install a web3 provider (or yours may be locked),<br />
              or use a dApp browser!
            </p>
            <a
              className="App-link"
              href="https://github.com/ryoungblom/climateth"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          </div>
        }

        </header>

      </div>

    );
  }
}

export default Home;
