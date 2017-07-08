import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Routes from "./routes.js";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/";
import sagas from "./sagas/";
import auth from "./reducers/auth";

import { graphql, ApolloProvider } from "react-apollo";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { persistStore, autoRehydrate } from "redux-persist";
import { AsyncStorage } from "react-native";

const sagaMiddleware = createSagaMiddleware();

const networkInterface = createNetworkInterface({
  uri: "https://api.github.com/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }

      // Send the login token in the Authorization header
      req.options.headers.authorization = `Bearer ${store.getState().auth
        .token}`;
      next();
    }
  }
]);

export const client = new ApolloClient({
  networkInterface
});

const store = createStore(
  combineReducers({
    auth: auth,
    apollo: client.reducer()
  }),
  {}, // initial state
  compose(
    autoRehydrate(),
    applyMiddleware(client.middleware(), sagaMiddleware),
    // If you are using the devToolsExtension, you can add it here also
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

sagaMiddleware.run(sagas);
persistStore(store, { storage: AsyncStorage });

export default (App = () =>
  <ApolloProvider store={store} client={client}>
    <Routes />
  </ApolloProvider>);
