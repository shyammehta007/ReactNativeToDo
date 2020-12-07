import {StyleSheet} from 'react-native';
import {COLORS} from '../../styleAssets/colors';

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 50,
    borderRadius: 20,
    padding: 5,
    margin: 5,
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.LIGHTGREY,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  textContainer: {
    fontSize: 18,
    marginLeft: 10,
    color: COLORS.DARKSTATEGREY,
    flex: 1,
  },
  userNameContainer: {
    fontSize: 22,
    color: COLORS.RED,
  },
  itemFontStyle: {
    color: COLORS.LIGHTGREY,
    fontSize: 18,
  },
  bottomLogOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.DARKRED,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    padding: 5,
  },
  signOutTextStyle: {
    color: COLORS.WHITE,
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default styles;
