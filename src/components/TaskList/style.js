import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  titleContainer: {
    height: 60,
    backgroundColor: COLORS.GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  tasklistTitle: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginLeft: 15,
  },
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
  deletedStyle: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperatorStyle: {
    height: 0.5,
  },
  draggableIcon: {
    paddingLeft: 20,
  },
});

export default styles;
