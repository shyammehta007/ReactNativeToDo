import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStackScreen from '../HomeStackScreen';
import Settings from '../Details';
import {COLORS} from '../../constants/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Details') {
            iconName = focused ? 'list' : 'ios-list';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.TOMATO,
        inactiveTintColor: COLORS.GREY,
        labelStyle: {
          fontSize: 20,
        },
      }}>
      <Tab.Screen name="Home" component={HomeStackScreen} {...props} />
      <Tab.Screen name="Details" component={Settings} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
