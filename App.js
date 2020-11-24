import React, { useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListOfTaskLists from './src/components/ListOfTaskLists'
import TaskList from './src/components/TaskList'
import SignUpPage from './src/components/SignUpPage';
import SignInPage from './src/components/SignInPage';
import Ionicons from 'react-native-vector-icons/Ionicons';


const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeStackScreen = (props) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={ListOfTaskLists} />
      <HomeStack.Screen name="Details" component={TaskList} />
    </HomeStack.Navigator>
  )
}

const USERSCREEN = {
  'guest': [{
    name: 'Sign Up',
    component: SignUpPage
  }
    , {
    name: 'Sign In',
    component: SignInPage
  }],
  'user': [{
    name: 'Home',
    component: HomeStackScreen
  }, {
    name: 'Settings',
    component: Settings
  }]
}

function Settings({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
    </View>
  );
}

export default function App() {
  const [isLoggedIn, setLogin] = useState(false)
  const screensLoaded = isLoggedIn ? USERSCREEN['user'] : USERSCREEN['guest']
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        {screensLoaded.map(({ name, component }) => <Tab.Screen name={name} component={component} key={name} initialParams={{ setLogin }} />)}
      </Tab.Navigator>
    </NavigationContainer>
  );
}


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