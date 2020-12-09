import {StyleSheet} from 'react-native';

import {COLORS} from '../../styles/colors';

const styles = StyleSheet.create({
  titleContainer: {
    height: 40,
    backgroundColor: COLORS.GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskTextStyle: {
    color: COLORS.CHARTREUSE,
    fontSize: 20,
  },
  tasklistTitle: {
    color: COLORS.WHITE,
    fontSize: 20,
    marginLeft: 15,
  },
  deletedStyle: {
    backgroundColor: COLORS.RED,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperatorStyle: {
    height: 0.5,
  },
});

export default styles;
