import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Auth from './src/screens/Auth';

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}
