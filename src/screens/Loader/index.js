import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'green'} />
    </View>
  );
};

export default Loader;
