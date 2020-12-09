import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import Loader from '../Loader';
import {
  toggleLoading,
  tokenStorageChecking,
} from '../../actions/AuthenticationOps';
import appMainDrawer from '../appMainDrawer';

const Stack = createStackNavigator();

const AppStackNav = (props) => {
  const {userToken, isLoading, checkForToken} = props;
  useEffect(() => {
    checkForToken();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Stack.Navigator
      initialRouteName={userToken ? 'ToDo' : 'SignUp'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="ToDo" component={appMainDrawer} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state) => {
  const {
    Authentication: {userToken, isLoading},
  } = state;
  return {
    userToken,
    isLoading,
  };
};

const mapStateToDispatch = {
  checkForToken: tokenStorageChecking,
  dispatchToggleLoading: toggleLoading,
};

export default connect(mapStateToProps, mapStateToDispatch)(AppStackNav);
