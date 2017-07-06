import { delay } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
const base64 = require("base-64");

import config from "../config";
const AUTH_URL_PATH = "https://api.github.com/authorizations";

export function* login(data) {
  console.log(data.data.email, data.data.password);
  const bytes = data.data.email.trim() + ":" + data.data.password.trim();
  const encoded = base64.encode(bytes);
  try {
    let response = yield fetch(AUTH_URL_PATH, {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
        "User-Agent": "GitHub Issue Browser",
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        scopes: ["user", "repo"],
        note: "not abuse"
      })
    });
    const isValid = response.status < 400;
    const body = response._bodyInit;
    let json = yield response.json();
    if (isValid) {
      console.log(json.token);
      return json.token;
    } else {
      throw new Error(json.message);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function tokenHeader() {
  let tHeader = {
    "User-Agent": config.userAgent,
    Accept: "application/vnd.github.v3+json"
  };
  if (this.isLogined()) {
    tHeader.Authorization = "token " + GLOBAL_USER.tokenInfo.token;
  }

  return tHeader;
}

// Our worker Saga: will perform the async increment task
export function* tryLogin(data) {
  try {
    const result = yield call(login, data);

    yield put({
      type: "LOGIN_SUCCESS",
      axiosConfig: result.axiosConfig,
      data: { token: result }
    });
  } catch (error) {
    yield put({
      type: "LOGIN_ERROR",
      data: {}
    });
  }
}

export function* watchAuth() {
  yield takeEvery("LOGIN_REQUEST", tryLogin);
}
