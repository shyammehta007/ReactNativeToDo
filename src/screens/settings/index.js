import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import styles from './styles';
import {logOut} from '../../actions/AuthenticationOps';

const Settings = (props) => {
  const {dispatchLogOut, userName} = props;
  return (
    <View style={styles.screenStyle}>
      <TouchableOpacity
        onPress={() => {
          dispatchLogOut();
        }}
        style={styles.container}>
        <Ionicons name="exit" size={35} color={'white'} />
        <Text style={styles.textStyle}>Log-Out: {userName}</Text>
      </TouchableOpacity>
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
export default connect(mapStateToProps, {dispatchLogOut: logOut})(Settings);
