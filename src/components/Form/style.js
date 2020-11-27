import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 18,
    color: COLORS.OLIVE,
    marginBottom: 20,
  },
  feildInput: {
    borderWidth: 1,
    fontSize: 18,
    borderColor: COLORS.SLATEGREY,
    color: COLORS.BLACK,
    height: 40,
    padding: 2,
  },
  formContainer: {
    backgroundColor: COLORS.LIGHTBLUE,
    height: '60%',
    width: '70%',
    justifyContent: 'space-evenly',
    padding: 10,
    borderRadius: 20,
    borderColor: COLORS.BLUE,
    borderWidth: 1,
  },
  submitButton: {
    height: 40,
    backgroundColor: COLORS.PURPLE,
    width: 100,
    textAlign: 'center',
    borderRadius: 20,
    alignSelf: 'center',
  },
});

export default styles;
