import React, { useState } from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import ListOfTaskLists from './components/ListOfTaskLists'
import TaskList from './components/TaskList'

const Root = createStackNavigator()

const App = (props) => {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Home" component={ListOfTaskLists} />
        <Root.Screen name="Details" component={TaskList} />
      </Root.Navigator>
    </NavigationContainer>
  )
}


export default App

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
})