import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpPage from './src/components/SignUpPage';
import SignInPage from './src/components/SignInPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './src/screens/HomeStackScreen'
import Settings from './src/screens/settings'
const Tab = createBottomTabNavigator();

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
