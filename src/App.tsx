import "@fontsource/mirza";
import "@fontsource/uncial-antiqua";

import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";
import { RaidJobsContextProvider } from "./contexts/raidJobsContext";

import LayoutDefault from "./components/layoutDefault";
import Companies from "./pages/companies.js";
import Jobs from "./pages/jobs.js";
import Error from "./pages/error.js";
import Help from "./pages/help.js";

const App = () => {
  return (
    <RaidJobsContextProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <LayoutDefault exact path="/" component={Jobs} />

            <LayoutDefault exact path="/companies" component={Companies} />

            <LayoutDefault exact path="/help" component={Help} />

            <LayoutDefault exact component={Error} />
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </RaidJobsContextProvider>
  );
};

export default App;
