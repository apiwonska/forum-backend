import React from 'react';
import { Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../pages/auth/login';
import Logout from '../pages/auth/logout';
import Registration from '../pages/auth/registration';
import PasswordReset from '../pages/auth/passwordReset';
import PasswordResetConfirm from '../pages/auth/passwordResetConfirm';
import Home from '../pages/home';
import CategoryList from '../pages/categoryList';
import Profile from '../pages/profile';
import Thread from '../pages/thread';
import ThreadList from '../pages/threadList';

import Header from '../components/header';
import Footer from '../components/footer';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const Routing = (props) => {
  return (
    <HashRouter>
      <Header/>
      <Route path='/' exact component={ props.authenticated ? CategoryList : Home } />
      <RestrictedRoute path='/register' exact component={ Registration } />
      <RestrictedRoute path='/auth' exact component={ Login } />
      <RestrictedRoute path='/logout' exact component={ Logout } />
      <RestrictedRoute path='/password-reset' exact component={ PasswordReset } />
      <RestrictedRoute path = '/password-reset/confirm' exact component = { PasswordResetConfirm } />
      <PrivateRoute path='/categories/:categoryId' exact component={ ThreadList } />
      <PrivateRoute path='/categories/:categoryId/threads/:threadId' exact component={ Thread } />
      <PrivateRoute path='/profile/:userId' exact component={ Profile } />
      <Footer/>
    </HashRouter>
  )
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Routing);