import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Admin from '../containers/Admin';
import Login from '../containers/Login';
import Register from '../containers/Register';

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* Auth */}
      <Route path="/register" component={Register} />

      <Route path="/login" component={Login} />

      {/* Admin */}
      <Route path="/admin" component={Admin} />

      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
);

export default Router;
