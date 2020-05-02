/**
 *
 * ManageSession
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageSession from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as ACTIONS from './actions';
import * as SELECTORS from './selectors'
import jwt_decode from "jwt-decode";

/* eslint-disable react/prefer-stateless-function */
export class ManageSession extends React.Component {
  state = {
    payload: {
      username: '',
      password: '',
    },
    loginResponse: '',
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.loginResponse !== this.props.loginResponse) {
      localStorage.token = nextProps.loginResponse;
      this.props.history.push('/');
    }
  }

  onChangeHandler = event => {
    let payload = { ...this.state.payload }
    payload[event.currentTarget.id] = event.currentTarget.value;
    this.setState({ payload })
  }

  loginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.payload)
  }

  render() {
    return (
      <div class="loginContainer">
        <div class="loginBox">
          <div class="loginHeader"><img src={require("../../assets/images/logo.jpg")} /></div>
          <div class="loginForm">
            <form onSubmit={this.loginHandler}>
              <div class="form-group">
                <input type="email" placeholder="Email" id="username" value={this.state.payload.username} class="form-control" onChange={this.onChangeHandler} />
              </div>

              <div class="form-group">
                <input type="password" class="form-control" id="password" value={this.state.payload.password} placeholder="Password" onChange={this.onChangeHandler} />
              </div>
              <div class="form-group contentInCenter">
                <button type="submit" class="btn btn-primary" >Login</button>
              </div>
              <a class="f-12 text-primary">Forget Password</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ManageSession.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginResponse: SELECTORS.login(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: payload => dispatch(ACTIONS.login(payload))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'manageSession', reducer });
const withSaga = injectSaga({ key: 'manageSession', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageSession);
