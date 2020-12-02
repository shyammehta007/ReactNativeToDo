import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: COLORS.WHITE,
    width: '70%',
    padding: 10,
    shadowColor: COLORS.PURPLE,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fieldContainer: {
    height: 100,
    padding: 10,
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 18,
    color: COLORS.LIGHTGREY,
    alignSelf: 'center',
  },
  feildInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    borderColor: COLORS.SLATEGREY,
    color: COLORS.LIGHTGREEN,
    height: 40,
    padding: 2,
  },
  submitButton: {
    height: 40,
    backgroundColor: COLORS.LIGHTBLACK,
    width: 100,
    textAlign: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default styles;
