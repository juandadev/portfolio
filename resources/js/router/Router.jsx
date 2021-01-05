import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Admin from '../containers/Admin';
import Login from '../containers/Login';
import Register from '../containers/Register';

const Router = () => {
  const login = localStorage.getItem('isLoggedIn');

  return (
    <BrowserRouter>
      <Switch>
        {login ? (
          <>
            <Route exact path="/" component={Home} />

            <Route path="/admin" component={Admin} />

            <Route path="/register" component={Register} />
          </>
        ) : (
          <>
            <Route exact path="/" component={Home} />

            <Route path="/login" component={Login} />

            <Route path="/register" component={Register} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
