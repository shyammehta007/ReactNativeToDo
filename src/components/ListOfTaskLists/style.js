import {StyleSheet} from 'react-native';

import {COLORS} from '../../styles/colors';

const styles = StyleSheet.create({
  homeHeader: {
    height: 60,
    backgroundColor: COLORS.DARKSTATEGREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  detailsViewRedirection: {
    color: COLORS.WHITE,
    fontSize: 25,
  },
  deletedStyle: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperatorStyle: {
    height: 0.5,
  },
});

export default styles;
