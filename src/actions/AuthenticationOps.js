import AsyncStorage from '@react-native-async-storage/async-storage';

import TYPE from './types';

const setStorageData = async ({userName, userToken}) => {
  await AsyncStorage.multiSet([
    ['taskAppToken', userToken],
    ['userName', userName],
  ]);
};

// TO_DO
// const getStorageData = async () => {
//   const data = await AsyncStorage.multiGet(['taskAppToken', 'userName']);
//   const userToken = data[0][1] || null;
//   const userName = data[1][1] || '';
//   return {
//     userName,
//     userToken,
//   };
// };

const removeStorageData = async () => {
  await AsyncStorage.multiRemove(['taskAppToken', 'userName']);
};

export const toggleLoading = () => ({
  type: TYPE.TOGGLE_LOADING,
});

export const signIn = (userName) => async (dispatch) => {
  const userToken = 'AW3S-0M3P-R0J3';
  await setStorageData({userName, userToken});
  dispatch({
    type: TYPE.SIGN_IN,
    payload: {
      userToken,
      userName,
    },
  });
};

export const signUp = (userName) => async (dispatch) => {
  const userToken = 'AW3S-0M3P-R0J3';
  dispatch(toggleLoading());
  await setStorageData({userToken, userName});
  dispatch({
    type: TYPE.SIGN_UP,
    payload: {
      userToken,
      userName,
    },
  });
  dispatch(toggleLoading());
};

export const logOut = () => async (dispatch) => {
  await removeStorageData();
  dispatch({
    type: TYPE.LOG_OUT,
  });
};
