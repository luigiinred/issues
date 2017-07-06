import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";

import Login from "./routes/login";
import Dashboard from "./routes/dashboard";

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
          <Route exact path="/dashboard" component={Dashboard} />
        </View>
      </NativeRouter>
    );
  }
}

export default Routes;
