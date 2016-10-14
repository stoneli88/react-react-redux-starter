import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  RESTFUL_SERVER } from '../../utils/apiUtils';

// 未完成任务
export const UNDO_DAY_TASK_REQUEST = 'UNDO_DAY_TASK_REQUEST';
export const UNDO_DAY_TASK_SUCCESS = 'UNDO_DAY_TASK_SUCCESS';
export const UNDO_DAY_TASK_FAILURE = 'UNDO_DAY_TASK_FAILURE';
