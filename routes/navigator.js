import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  FlatList,
  ListItem,
  KeyboardAvoidingView,
  TouchableHighlight,
  NavigatorIOS,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { Redirect } from "react-router-native";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Dashboard from "./dashboard.js";

class NavigatorIOSApp extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    console.log("logging out");
    this.props.dispatch({
      type: "LOGOUT_REQUEST"
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigatorIOS
          initialRoute={{
            component: Dashboard,
            title: "Repos",
            onRightButtonPress: this.logout,
            rightButtonTitle: "Logout"
          }}
          style={{ flex: 1 }}
          barTintColor="#FF5722"
          tintColor="#ffffff"
          titleTextColor="#ffffff"
        />
      </View>
    );
  }
}
export default connect()(NavigatorIOSApp);
