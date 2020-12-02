import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './style';
import {Drawer} from 'react-native-paper';
import {logOut} from '../../actions/AuthenticationOps';
import {COLORS} from '../../constants/colors';

const DrawerContent = (props) => {
  const {userName, navigation, dispatchLogOut} = props;
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}>
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
            icon={() => (
              <Ionicons name="home" color={COLORS.LIGHTGREEN} size={28} />
            )}
            labelStyle={styles.itemFontStyle}
            label="Home"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={() => (
              <Ionicons name="settings" color={COLORS.LIGHTGREEN} size={28} />
            )}
            labelStyle={styles.itemFontStyle}
            label="Details"
            onPress={() => {
              navigation.navigate('Details');
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <TouchableOpacity
          onPress={() => dispatchLogOut()}
          style={styles.bottomLogOutButton}>
          <Ionicons name="exit" size={35} color={COLORS.WHITE} />
          <Text style={styles.signOutTextStyle}>Sign Out</Text>
        </TouchableOpacity>
      </Drawer.Section>
    </View>
  );
};

const mapStateToProps = (state) => {
  const {
    Authentication: {userName},
  } = state;
  return {
    userName,
  };
};

const mapStateToDispatch = {
  dispatchLogOut: logOut,
};

export default connect(mapStateToProps, mapStateToDispatch)(DrawerContent);
