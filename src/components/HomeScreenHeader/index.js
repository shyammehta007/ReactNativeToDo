import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import styles from './style';
import {logOut, clearStore} from '../../actions/AuthenticationOps';
import {COLORS} from '../../styles/colors';

const HomeScreenHeader = (props) => {
  const {
    navigation,
    dispatchLogOut,
    dispatchClearStore,
    title = 'Home',
  } = props;

  const logOutHandler = () => {
    dispatchClearStore();
    dispatchLogOut();
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.drawerIcon}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Ionicons name="list-sharp" size={35} color={COLORS.BLACK} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title} </Text>
      <TouchableOpacity style={styles.logoutIcon} onPress={logOutHandler}>
        <Ionicons name="exit" size={35} color={COLORS.RED} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToDispatch = {
  dispatchLogOut: logOut,
  dispatchClearStore: clearStore,
};

export default connect(null, mapStateToDispatch)(HomeScreenHeader);
