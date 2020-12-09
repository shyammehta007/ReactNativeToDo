import {StyleSheet} from 'react-native';

import {COLORS} from '../../../styles/colors';

const styles = StyleSheet.create({
  taskElementContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.LIGHTBLUE,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkBoxContainer: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  checkBoxStyle: {
    height: 20,
    width: 20,
  },
  taskTitle: {
    marginLeft: 10,
    width: '75%',
    color: COLORS.BLUE,
    fontSize: 20,
  },
  crossStyle: {
    textDecorationLine: 'line-through',
    textDecorationColor: COLORS.BLACK,
  },
});

export default styles;
