import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
