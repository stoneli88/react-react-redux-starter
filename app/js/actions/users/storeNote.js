import {
  callApi,
  ID_TOKEN,
  loadIdToken,
  setIdToken,
  removeIdToken,
  RESTFUL_SERVER } from '../../utils/apiUtils';

// 门店通知.
export const STORE_NOTE_REQUEST = 'STORE_NOTE_REQUEST';
export const STORE_NOTE_SUCCESS = 'STORE_NOTE_SUCCESS';
export const STORE_NOTE_FAILURE = 'STORE_NOTE_FAILURE';

function storeNoteRequest(user) {
  return {
    type: STORE_NOTE_REQUEST,
    user,
  };
}

function storeNoteSuccess(payload) {
  return {
    type: STORE_NOTE_SUCCESS,
    storeNoteSize: payload.storeNoteSize,
    storeNoteList: payload.storeNoteList,
  };
}

function storeNoteFailure(error) {
  return {
    type: STORE_NOTE_FAILURE,
    error,
  };
}

// 请求获得当日的任务
export function getStoreNote() {
  const profile = loadIdToken();
  const userId = profile.userId;
  const token = `
    ${userId},${profile.workNum},${profile.position},${profile.storeCode},${profile.storeOutletId}`;
  const config = {
    method: 'post',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {},
  };

  return callApi(`${RESTFUL_SERVER}/guider/store_note.json?token=${token}`,
    config,
    storeNoteRequest(token),
    storeNoteSuccess,
    storeNoteFailure
  );
}
