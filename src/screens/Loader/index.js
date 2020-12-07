import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import styles from './styles';
import {COLORS} from '../../styleAssets/colors';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.LIGHTGREEN} />
    </View>
  );
};

export default Loader;
