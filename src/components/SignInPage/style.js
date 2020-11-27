import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

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
