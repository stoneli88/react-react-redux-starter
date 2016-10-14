import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  RESTFUL_SERVER } from '../../utils/apiUtils';

// 本月销售完成进度
export const MONTH_SALE_REQUEST = 'MONTH_SALE_REQUEST';
export const MONTH_SALE_SUCCESS = 'MONTH_SALE_SUCCESS';
export const MONTH_SALE_FAILURE = 'MONTH_SALE_FAILURE';
