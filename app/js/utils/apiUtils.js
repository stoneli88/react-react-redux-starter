import 'isomorphic-fetch';
import moment from 'moment';

require('es6-promise').polyfill();

export const RESTFUL_SERVER = 'http://shop.weihaojiao.com';

// 检查响应返回的状态.
export function checkStatus(response) {
  if (!response.ok) { // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

/**
 * A utility to call a restful service.
 * 使用fetch实现的ajax工具方法.
 *
 * @param url The restful service end point.
 * @param config The config object of the call. Can be null.
 * @param request The request action.
 * @param onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
 /* eslint no-param-reassign: [0] */
export function callApi(url, config, request, onRequestSuccess, onRequestFailure) {
  return dispatch => {
    dispatch(request);

    return fetch(url, config)
      .then(checkStatus)
      .then(parseJSON)
      .then((json) => {
        if (json.code !== 0) {
          const error = {};
          error.status = json.code;
          error.message = `请求失败, 返回code为${json.code}`;
          dispatch(onRequestFailure(error));
        } else {
          dispatch(onRequestSuccess(json));
        }
      })
      .catch((error) => {
        const response = error.response;
        if (response === undefined) {
          dispatch(onRequestFailure(error));
        } else {
          error.status = response.status;
          error.statusText = response.statusText;
          response.text().then((text) => {
            try {
              const json = JSON.parse(text);
              error.message = json.message;
            } catch (ex) {
              error.message = text;
            }
            dispatch(onRequestFailure(error));
          });
        }
      });
  };
}

// 后端token的标示符以及对应的getter和setter方法.
// 目前后台没有token的实现, 暂时采用userid实现.
// 超时时间暂定为30分钟.
export const USER_ID_TOKEN = 'user_id_token';
export const USER_TIME_OUT = 'user_time_out';
export function setIdToken(idToken) {
  localStorage.setItem(USER_ID_TOKEN, JSON.stringify(idToken));
  localStorage.setItem(USER_TIME_OUT, moment().add(30, 'minutes').toString());
}
export function removeIdToken() { localStorage.removeItem(USER_ID_TOKEN); }
export function loadIdToken() { return JSON.parse(localStorage.getItem(USER_ID_TOKEN)); }

// 刷新页面后需要检查用户是否已经登录.
export function loadUserProfile() {
  try {
    const idToken = JSON.parse(localStorage.getItem(USER_ID_TOKEN));
    const now = moment();

    if (now.isAfter(new Date(localStorage.getItem(USER_TIME_OUT)))) {
      // user profile has expired.
      removeIdToken();
      return null;
    }
    return idToken;
  } catch (err) {
    return null;
  }
}
