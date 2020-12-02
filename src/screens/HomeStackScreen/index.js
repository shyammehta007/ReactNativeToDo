import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListOfTaskLists from '../../components/ListOfTaskLists';
import TaskList from '../../components/TaskList';
import HomeScreenHeader from '../../components/HomeScreenHeader';

const HomeStack = createStackNavigator();

const HomeStackScreen = (prop) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ListOfTaskLists}
        options={{
          headerTitle: (props) => <HomeScreenHeader {...props} {...prop} />,
        }}
      />
      <HomeStack.Screen name="Details" component={TaskList} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
