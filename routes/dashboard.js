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
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }
  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.background}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text>
              {this.props.loading ? "Loading" : "This is a Dashboard"}
            </Text>
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

// export default connect(state => {
//   console.log(state);
//   return { isLoggedIn: !!state.auth.token };
// })(Login);
export default graphql(
  gql`
    query GetRepositories($number_of_repos: Int!) {
      viewer {
        name
        repositories(last: $number_of_repos) {
          nodes {
            name
          }
        }
      }
    }
  `,
  {
    options: ({ login, name }) => ({
      variables: {
        states: ["OPEN"],
        number_of_repos: 5,
        login,
        name,
        before: null
      }
    }),
    props: ({ data }) => {
      if (data.loading) {
        return { loading: true, fetchNextPage: () => {} };
      }

      if (data.error) {
        console.log(data.error);
      }
      console.log(data);
      return {
        loading: false,
        repositories: data.viewer.repositories.nodes
        // We don't want our UI component to be aware of the special shape of
        // GraphQL connections, so we transform the props into a simple array
        // directly in the container. We also reverse the list since we want to
        // start from the most recent issue and scroll down
      };
    }
  }
)(Dashboard);
