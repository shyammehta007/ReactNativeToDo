import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import SignInPage from '../SignInPage';
import SignUpPage from '../SignUpPage';
import MainTabNavigator from '../MainTabNavigator';
import Loader from '../Loader';
import {COLORS} from '../../styles/colors';
import {
  toggleLoading,
  tokenStorageChecking,
} from '../../actions/AuthenticationOps';
import DrawerContent from '../../components/DrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Auth = (props) => {
  const {userToken, isLoading, checkForToken} = props;
  useEffect(() => {
    checkForToken();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (userToken) {
    return (
      <Drawer.Navigator drawerContent={(prop) => <DrawerContent {...prop} />}>
        <Drawer.Screen name="To Do" component={MainTabNavigator} />
      </Drawer.Navigator>
    );
  }
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.TOMATO,
        inactiveTintColor: COLORS.GREY,
        labelStyle: {
          fontSize: 20,
        },
      }}>
      <Tab.Screen name="Sign Up" component={SignUpPage} />
      <Tab.Screen name="Sign In" component={SignInPage} />
    </Tab.Navigator>
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

export default connect(mapStateToProps, mapStateToDispatch)(Auth);
