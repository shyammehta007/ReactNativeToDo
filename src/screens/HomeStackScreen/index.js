import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListOfTaskLists from '../../components/ListOfTaskLists';
import TaskList from '../../components/TaskList';
import HomeScreenHeader from '../../components/HomeScreenHeader';

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={ListOfTaskLists}
        options={{
          headerTitle: () => <HomeScreenHeader {...props} />,
        }}
      />
      <HomeStack.Screen name="Tasklist" component={TaskList} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
