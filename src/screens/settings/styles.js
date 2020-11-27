import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  screenStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    backgroundColor: COLORS.FIREBRICK,
  },
  textStyle: {
    color: COLORS.WHITE,
    minWidth: 150,
    textAlign: 'center',
    maxWidth: 200,
  },
});

export default styles;
