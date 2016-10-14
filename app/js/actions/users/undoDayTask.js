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

function undoDayTaskRequest(user) {
  return {
    type: UNDO_DAY_TASK_REQUEST,
    user,
  };
}

function undoDayTaskSuccess(payload) {
  return {
    type: UNDO_DAY_TASK_SUCCESS,
    storeNoteSize: payload.storeNoteSize,
    storeNoteList: payload.storeNoteList,
  };
}

function undoDayTaskFailure(error) {
  return {
    type: UNDO_DAY_TASK_FAILURE,
    error,
  };
}

// 请求获得当日的任务
export function getUndoDayTask() {
  const profile = loadIdToken();
  const userId = profile.userId;
  /* eslint max-len: [0] */
  const token = `${userId},${profile.workNum},${profile.position},${profile.storeCode},${profile.storeOutletId}`;
  const config = {
    method: 'post',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {},
  };

  return callApi(`${RESTFUL_SERVER}/guider/undo_task.json?token=${token}`,
    config,
    undoDayTaskRequest(token),
    undoDayTaskSuccess,
    undoDayTaskFailure
  );
}
