import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from './header';

const LayoutDefault = (props) => (
  <Fragment>
    <Header />
    <Route {...props} />
  </Fragment>
);

export default LayoutDefault;
