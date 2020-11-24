import React from 'react'
import ListOfTaskLists from '../../components/ListOfTaskLists'
import TaskList from '../../components/TaskList'
import { createStackNavigator } from '@react-navigation/stack'
const HomeStack = createStackNavigator()

const HomeStackScreen = (props) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={ListOfTaskLists} />
            <HomeStack.Screen name="Details" component={TaskList} />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen