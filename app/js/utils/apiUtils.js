import 'isomorphic-fetch';
import moment from 'moment';

require('es6-promise').polyfill();

export const RESTFUL_SERVER = 'http://shop.weihaojiao.com';

// 后端的返回的出错代码映射
export const RESTFUL_ERROR_MESSAGE = {
  '-100': '操作超时，请重新登录',
  '-200': '用户信息有误，请联系管理员',
  '-999': '未知错误',
  '-1': {
    login: '登录人职位不允许登录导购平台(不是导购、督导、店长)',
    current_day_task: '未获取到任何今日任务信息',
    undo_task: '未获取到任何未完成任务信息',
    store_note: '未获取到任何门店通知信息',
    month_sale: '未设置本月销售完成进度',
  },
};

// 根据code返回错误上下文
function errorMsg(errCode, module) {
  switch (errCode) {
    case -100:
      return RESTFUL_ERROR_MESSAGE['-100'];
    case -200:
      return RESTFUL_ERROR_MESSAGE['-200'];
    case -999:
      return RESTFUL_ERROR_MESSAGE['-999'];
    case -1:
      switch (module) {
        case 'login':
          return RESTFUL_ERROR_MESSAGE['-1'].module;
        case 'current_day_task':
          return RESTFUL_ERROR_MESSAGE['-1'].module;
        case 'undo_task':
          return RESTFUL_ERROR_MESSAGE['-1'].module;
        case 'store_note':
          return RESTFUL_ERROR_MESSAGE['-1'].module;
        case 'month_sale':
          return RESTFUL_ERROR_MESSAGE['-1'].module;
        default:
          break;
      }
      break;
    default:
      break;
  }
  return RESTFUL_ERROR_MESSAGE['-999'];
}

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
          if (json.code === 1) {
            const module = url.substr(url.lastIndexOf('/') + 1).replace('.json', '');
            error.message = errorMsg(json.code, module);
          }
          error.message = errorMsg(json.code);
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
              switch (error.status) {
                case 404:
                case 415:
                case 403:
                  error.message = `请求后端数据出现错误, 代码为${error.status}`;
                  break;
                case 500:
                  error.message = '后端服务出现错误, 代码为500';
                  break;
                default:
                  error.message = `未知后台错误, 代码为: ${error.status}`;
              }
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
