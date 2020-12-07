import {StyleSheet} from 'react-native';
import {COLORS} from '../../styleAssets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: COLORS.RED,
  },
});

export default styles;
