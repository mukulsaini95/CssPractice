/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Switch, Route } from 'react-router-dom';

let allContainers = ["ManageUsers"]

allContainers.map(container => {
  window[container] = require(`../${container}/Loadable`).default;
})


class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error: error,
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div className="codeErrorBox">
          <div className="codeInnerBox">
            <p>OOPS!</p>
            <span>Something Went wrong</span>
          </div>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  state = {
    routes: [
      { "path": "/users", "component": ManageUsers },
      { "path": "/", "component": ManageUsers },
    ],
  }

  toggleSideNav = (isSideNavCollapsed) => {
    if (isSideNavCollapsed) {
      $('#sideNav').css({ width: "70px" })
      $('#sideNavOpenIcon').css({ "display": "block" })
      $('#sideNavCloseIcon').css({ "display": "none" })
      $('#menuNavigationSlideWrapper').css({ "display": "none" })
    } else {
      $('#sideNav').css({ width: "100%" })
      $('#sideNavOpenIcon').css({ "display": "none" })
      $('#sideNavCloseIcon').css({ "display": "block" })
      $('#menuNavigationSlideWrapper').css({ "display": "block" })

    }
  }

  render() {
    return (
      <div className="wrapper">
            <div className="header"></div>
            <div className="sideNav" id="sideNav">
              <div className="sidenavContainer">

                <div className="activeTabName">
                  <span >Manage Users</span>
                </div>


                <div className="sideNavLogo">
                  <p >VPS</p>
                </div>

                <div className="sideNavIcon" id="sideNavOpenIcon" onClick={() => this.toggleSideNav(false)}>
                  <i className="fa fa-bars fa-2x "></i>
                </div>
                <div className="sideNavCloseIcon" id="sideNavCloseIcon" onClick={() => this.toggleSideNav(true)}>
                  <i className="fa fa-close fa-2x"></i>
                </div>
              </div>
              <div className="menuNavigationSlideWrapper" id="menuNavigationSlideWrapper">
                <div className="menuList">
                  <ul >
                    <li><a href="#" className="active">Manage Users</a></li>
                    <li><a href="#" className="">Manage Role</a></li>
                    <li><a href="#" className="">About Us</a></li>
                    <li><a href="#" className="">Dashboard</a></li>
                    <li><a href="#" className="">Application</a></li>
                    <li><a href="#" className=""></a></li>
                    <li><a href="#" className="">Manage Users</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="contentBox">
              <Switch>
                {this.state.routes.map((route, routeIndex) => {
                  let Comp = route.component;
                  return (
                    <Route
                      key={routeIndex}
                      exact
                      path={route.path}
                      render={(props) => <Comp {...props} />}
                    />
                  );
                })}
                <Route component={() => <div>Page Not Found!</div>} />
              </Switch>
        </div>
      </ div>
    );
  }
}
