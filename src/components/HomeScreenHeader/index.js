import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import styles from './style';
import {logOut, clearStore} from '../../actions/AuthenticationOps';

const HomeScreenHeader = (props) => {
  const {navigation, dispatchLogOut, dispatchClearStore} = props;

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
        <Ionicons name="list-sharp" size={35} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Home </Text>
      <TouchableOpacity style={styles.logoutIcon} onPress={logOutHandler}>
        <Ionicons name="exit" size={35} color={'red'} />
      </TouchableOpacity>
    </View>
  );
};

export default connect(null, {
  dispatchLogOut: logOut,
  dispatchClearStore: clearStore,
})(HomeScreenHeader);
