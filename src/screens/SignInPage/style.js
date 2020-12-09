import {StyleSheet} from 'react-native';
import {COLORS} from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeader: {
    color: COLORS.LIGHTBLACK,
    fontSize: 20,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: COLORS.RED,
  },
});

export default styles;
