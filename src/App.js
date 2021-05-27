import '@fontsource/mirza';
import '@fontsource/uncial-antiqua';

import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme';

import LayoutDefault from './components/layoutDefault';
import Companies from './pages/companies.js';
import Jobs from './pages/jobs.js';
import Error from './pages/error.js';
import Help from './pages/help.js'


class App extends Component {

  render() {
    return (
      <ChakraProvider theme={theme}>
         <BrowserRouter>
            <Switch>
             <LayoutDefault exact path="/" render={props =>
               (<Jobs {...props} state={this.state}/>)
             } />

             <LayoutDefault exact path="/companies" render={props =>
               (<Companies {...props} state={this.state}/>)
             } />

             <LayoutDefault exact path="/help" render={props =>
               (<Help {...props} state={this.state}/>)
             } />

             <LayoutDefault exact component={Error}/>
           </Switch>
        </BrowserRouter>
      </ChakraProvider>
    );
  }
}

export default App;
