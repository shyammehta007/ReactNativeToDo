import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.WHITE,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 10,
    alignSelf: 'center',
    width: '90%',
  },
  headerContainer: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '400',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    width: '40%',
    textAlign: 'center',
    shadowOffset: {width: 3, height: 3},
    shadowColor: COLORS.GREY,
    shadowOpacity: 0.8,
    borderWidth: 1,
    borderColor: COLORS.DARKSTATEGREY,
    margin: 5,
  },
});

export default styles;
