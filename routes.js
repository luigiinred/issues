import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Redirect, Link } from "react-router-native";

import Login from "./routes/login";
import Navigator from "./routes/navigator";

import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn
          ? <Component {...props} />
          : <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />}
    />
  );
};

class Routes extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      isAuthenticated: true
    };
  }

  componentWillMount() {}

  render() {
    return (
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <Route exact path="/" component={Login} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Navigator}
            isLoggedIn={this.props.isLoggedIn}
          />
        </View>
      </NativeRouter>
    );
  }
}
export default connect(state => {
  console.log(state);
  return { isLoggedIn: !!state.auth.token };
})(Routes);
