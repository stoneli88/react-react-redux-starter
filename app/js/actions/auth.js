import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  RESTFUL_SERVER } from '../utils/apiUtils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user,
  };
}

function loginSuccess(payload) {
  const profile = payload.loginUser;
  setIdToken(profile);
  return {
    type: LOGIN_SUCCESS,
    user: profile,
  };
}

function loginFailure(error) {
  removeIdToken();
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function login(account, password) {
  const config = {
    method: 'post',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account,
      password,
    }),
  };

  return callApi(`${RESTFUL_SERVER}/crm/login.json`,
    config,
    loginRequest(account),
    loginSuccess,
    loginFailure
  );
}

function logoutRequest(user) {
  removeIdToken();
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(payload) {
  removeIdToken();
  return {
    type: LOGOUT_SUCCESS,
    user: payload.user,
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
}

export function logout() {
  const user = loadIdToken();
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
    }),
  };

  return callApi(`${RESTFUL_SERVER}/crm/logout.json`,
    config,
    logoutRequest,
    logoutSuccess,
    logoutFailure
  );
}
