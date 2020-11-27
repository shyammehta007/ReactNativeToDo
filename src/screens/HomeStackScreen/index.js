import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListOfTaskLists from '../../components/ListOfTaskLists';
import TaskList from '../../components/TaskList';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={ListOfTaskLists} />
      <HomeStack.Screen name="Details" component={TaskList} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
