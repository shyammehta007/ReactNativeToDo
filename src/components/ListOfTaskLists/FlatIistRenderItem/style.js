import {StyleSheet} from 'react-native';

import {COLORS} from '../../../styles/colors';

const styles = StyleSheet.create({
  listElementContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.DARKGREY,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listElementTitle: {
    backgroundColor: COLORS.DARKGREY,
    color: COLORS.NAVY,
    width: '75%',
    fontSize: 20,
    padding: 3,
  },
});

export default styles;
