import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStackScreen from '../HomeStackScreen';
import Details from '../Details';
import DrawerContent from '../../components/DrawerContent';

const Drawer = createDrawerNavigator();

const appMainDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(prop) => <DrawerContent {...prop} />}>
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="Details" component={Details} />
    </Drawer.Navigator>
  );
};

export default appMainDrawer;
