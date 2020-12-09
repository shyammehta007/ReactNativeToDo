import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppStackNav from './src/screens/AppStackNav';

export default function App() {
  return (
    <NavigationContainer>
      <AppStackNav />
    </NavigationContainer>
  );
}
