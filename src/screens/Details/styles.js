import {StyleSheet} from 'react-native';

import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  profileContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHTBLACK,
    margin: 2,
    shadowColor: COLORS.WHITE,
    borderRadius: 15,
  },
  iconStyle: {
    margin: 10,
  },
  profileText: {
    color: COLORS.WHITE,
    fontSize: 24,
  },
  tasklistCountContainer: {
    height: 80,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: COLORS.OFFBLUE,
  },
  tasklistText: {
    color: COLORS.YELLOWWHITE,
    fontSize: 24,
    textAlign: 'center',
  },
  tasklistCount: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  taskCountContainer: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  completedCountContainer: {
    width: '47%',
    backgroundColor: COLORS.YELLOWGREEN,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  completedText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  completedCount: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: 30,
  },
  uncompletedContainer: {
    width: '47%',
    backgroundColor: COLORS.FIREBRICK,
    borderRadius: 10,
    margin: 5,
    padding: 5,
  },
  uncompletedText: {
    fontSize: 18,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  uncompletedCount: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontSize: 30,
  },
  messageContainer: {
    height: 350,
    backgroundColor: COLORS.PINK,
    margin: 10,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  messageText: {
    fontSize: 40,
    textAlign: 'center',
    color: COLORS.WHITE,
    marginBottom: 70,
  },
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default styles;
