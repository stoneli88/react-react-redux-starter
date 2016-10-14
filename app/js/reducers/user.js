import {
  CURRENT_DAY_TASK_REQUEST,
  CURRENT_DAY_TASK_SUCCESS,
  CURRENT_DAY_TASK_FAILURE,
} from '../actions/users/currentDayTask';

// 初始化用户上下文.
const initialState = {
  currentDayTaskSize: 0,
  currentDayTaskList: [],
  undoTaskSize: 0,
  undoTaskList: [],
  error: null,
};

// 初始化用户登陆验证上下文的状态.
function initializeState() {
  return Object.assign({}, initialState);
}

export default function User(state = initializeState(), action = {}) {
  switch (action.type) {
    case CURRENT_DAY_TASK_REQUEST:
      return Object.assign({}, state);
    case CURRENT_DAY_TASK_SUCCESS:
      return Object.assign({}, state, { currentDayTaskSize: action.taskSize });
    case CURRENT_DAY_TASK_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
