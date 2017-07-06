import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { Redirect } from "react-router-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "issuestestaccount",
      password: "issuepassword1",
      isLoggedIn: props.isLoggedIn
    };
  }
  componentWillReceiveProps(props) {}
  componentWillMount() {}

  componentWillUnmount() {}

  login() {
    this.props.dispatch({
      type: "LOGIN_REQUEST",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.background}>
        {this.props.isLoggedIn &&
          <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: this.props.location }
            }}
          />}

        <View style={styles.container}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="email"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              style={styles.input}
            />
            <TextInput
              placeholder="password"
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              style={styles.input}
            />
            <Button
              onPress={this.login.bind(this)}
              title="Login"
              accessibilityLabel="Login"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#0070ff"
  },
  container: {
    flex: 1,
    flexDirection: "row"
  },
  formContainer: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  input: {
    flexGrow: 1,
    flexDirection: "row",

    height: 40,
    marginBottom: 20
  }
});

export default connect(state => {
  console.log(state);
  return { isLoggedIn: !!state.auth.token };
})(Login);
