import produce from 'immer';

import TYPE from '../actions/types';

const initialState = {
  userToken: null,
  userName: '',
  isLoading: true,
  isSignedOut: true,
};

const Authentication = (state = initialState, action) =>
  produce(state, (draftState) => {
    const {type, payload = {}} = action;
    const {userName, userToken} = payload;
    switch (type) {
      case TYPE.SIGN_IN:
        draftState.userName = userName;
        draftState.userToken = userToken;
        draftState.isSignedOut = false;
        break;
      case TYPE.SIGN_UP:
        draftState.userName = userName;
        draftState.userToken = userToken;
        draftState.isSignedOut = false;
        break;
      case TYPE.LOG_OUT:
        draftState.isSignedOut = true;
        draftState.userToken = null;
        break;
      case TYPE.TOGGLE_LOADING:
        draftState.isLoading = !draftState.isLoading;
        break;
      default:
    }
  });

export default Authentication;
