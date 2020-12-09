import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import styles from './style';
import {Drawer} from 'react-native-paper';
import {logOut} from '../../actions/AuthenticationOps';
import {COLORS} from '../../styles/colors';

const DrawerContent = (props) => {
  const {userName, navigation, dispatchLogOut} = props;

  const profileTouchHandler = () => {
    navigation.navigate('Details');
  };

  const homeTouchHandler = () => {
    navigation.navigate('Home');
  };

  const homeIconComponent = () => (
    <Ionicons name="home" color={COLORS.LIGHTGREEN} size={28} />
  );

  const detailTouchHandler = () => {
    navigation.navigate('Details');
  };

  const detailIconComponent = () => (
    <Ionicons name="settings" color={COLORS.LIGHTGREEN} size={28} />
  );

  const signOutHandler = () => {
    dispatchLogOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity onPress={profileTouchHandler}>
          <View style={styles.profileContainer}>
            <MaterialCommunityIcons
              name="account-circle"
              color={COLORS.LIGHTGREY}
              size={35}
            />
            <Text
              style={styles.textContainer}
              ellipsizeMode="tail"
              numberOfLines={1}>
              Hello , <Text style={styles.userNameContainer}>{userName}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <Drawer.Section>
          <DrawerItem
            style={styles.sectionItems}
            icon={homeIconComponent}
            labelStyle={styles.itemFontStyle}
            label="Home"
            onPress={homeTouchHandler}
          />
          <DrawerItem
            icon={detailIconComponent}
            labelStyle={styles.itemFontStyle}
            label="Details"
            onPress={detailTouchHandler}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <TouchableOpacity
          onPress={signOutHandler}
          style={styles.bottomLogOutButton}>
          <Ionicons name="exit" size={35} color={COLORS.WHITE} />
          <Text style={styles.signOutTextStyle}>Sign Out</Text>
        </TouchableOpacity>
      </Drawer.Section>
    </View>
  );
};

const mapStateToProps = (state) => {
  const userName = _.get(state, 'Authentication.userName', '');
  return {
    userName,
  };
};

const mapStateToDispatch = {
  dispatchLogOut: logOut,
};

export default connect(mapStateToProps, mapStateToDispatch)(DrawerContent);
