import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { initPosts } from '../actions';

import Home from '../containers/Home';
import Admin from '../containers/Admin';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Post from '../containers/Post';
import Blog from '../containers/Blog';

const Router = (props) => {
  const { initPosts } = props;

  fetch('/api/post')
    .then((response) => response.json())
    .then((data) => initPosts(data));

  return (
    <BrowserRouter>
      <Switch>
        {/* Auth */}
        <Route path="/register" component={Register} />

        <Route path="/login" component={Login} />

        {/* Admin */}
        <Route path="/admin" component={Admin} />

        <Route path="/blog/:slug" component={Post} />

        <Route path="/blog" component={Blog} />

        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  initPosts: PropTypes.any.isRequired,
};

const mapDispatchToProps = { initPosts };

export default connect(null, mapDispatchToProps)(Router);
