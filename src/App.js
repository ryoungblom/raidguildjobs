import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './components/nav.js'

import Home from './pages/home.js';
import Companies from './pages/companies.js';
import Jobs from './pages/jobs.js';
import History from './pages/history.js'
import Error from './pages/error.js';
import Help from './pages/help.js'


class App extends Component {

  render() {
    return (
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" render={props =>
               (<Home {...props} state={this.state}/>)
             } exact/>
             <Route path="/jobs" render={props =>
               (<Jobs {...props} state={this.state}/>)
             } exact/>
             <Route path="/companies" render={props =>
               (<Companies {...props} state={this.state}/>)
             } exact/>

             <Route path="/help" component={Help}/>

             <Route component={Error}/>
           </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
