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
  NavigatorIOS
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
      <View style={styles.container}>
        {this.props.loading
          ? <Text>loading</Text>
          : <FlatList
              data={this.props.repositories}
              renderItem={({ item }) =>
                <TouchableHighlight onPress={() => {}}>
                  <Text style={styles.row}>
                    {item.name}
                  </Text>
                </TouchableHighlight>}
              ItemSeparatorComponent={() =>
                <View style={styles.listView}>
                  <View style={styles.separator} />
                </View>}
              ListFooterComponent={() =>
                <View style={styles.listView}>
                  <View style={styles.footer} />
                </View>}
              ListHeaderComponent={() =>
                <View style={styles.listView}>
                  <View style={styles.footer} />
                </View>}
            />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efeff4"
  },
  header: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 16,
    borderBottomWidth: 0.5,
    backgroundColor: "#efeff4",
    borderColor: "#e3e3e3"
  },
  headerText: {
    fontWeight: "500",
    color: "#6d6d6d"
  },
  separator: {
    height: 1,
    marginLeft: 16,
    backgroundColor: "#e3e3e3"
  },
  footer: {
    height: 1,

    backgroundColor: "#e3e3e3"
  },
  row: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff"
  },
  listView: {
    backgroundColor: "#fff"
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
        number_of_repos: 25,
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
      if (!data.viewer) {
        return {
          loading: false,
          repositories: []
        };
      }
      return {
        loading: false,
        repositories: data.viewer.repositories.nodes
      };
    }
  }
)(Dashboard);
