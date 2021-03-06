import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
import initialState from '../store/initialState';

export default function(state = initialState.alert, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      state = payload;
      return [state];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id === payload.id);
    default:
      return state;
  }
}
