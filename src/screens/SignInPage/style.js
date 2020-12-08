import {StyleSheet} from 'react-native';
import {COLORS} from '../../styles/colors';

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
