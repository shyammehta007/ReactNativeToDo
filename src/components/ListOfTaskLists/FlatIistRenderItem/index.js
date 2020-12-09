import React from 'react';
import {View, TextInput, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {COLORS} from '../../../styles/colors';
import {updateTasklist} from '../../../actions/TaskListOps';
import styles from './style';

RenderListElement.propTypes = {
  listData: PropTypes.shape({
    tasklistId: PropTypes.string.isRequired,
    title: PropTypes.string,
  }),
  dispatchUpdateTasklist: PropTypes.func,
  leftAction: PropTypes.func,
  setTasklistEmpty: PropTypes.func,
  setPopupState: PropTypes.func,
  navigation: PropTypes.object,
};

function RenderListElement(props) {
  const {
    listData: {tasklistId, title},
    dispatchUpdateTasklist,
    leftAction,
    setTasklistEmpty,
    setPopupState,
    navigation,
  } = props;

  const onTitleEditHandler = (e) => {
    if (e) {
      dispatchUpdateTasklist({tasklistId, title: e});
      setTasklistEmpty(false);
    } else {
      setTasklistEmpty(true);
    }
  };

  const elementFocusHandler = (e) => {
    const {
      nativeEvent: {text},
    } = e;
    if (text) {
      return;
    }
    setTasklistEmpty(true);
  };

  const forwardPressHandler = () => {
    if (title) {
      navigation.navigate('Tasklist', {id: tasklistId});
    } else {
      setPopupState(true);
    }
  };

  const leftActionHandler = () => leftAction({tasklistId});

  return (
    <Swipeable renderLeftActions={leftActionHandler}>
      <View style={styles.listElementContainer}>
        <MaterialCommunityIcons
          name="drag-vertical-variant"
          color={COLORS.BLACK}
          size={30}
        />
        <TextInput
          style={styles.listElementTitle}
          onChangeText={onTitleEditHandler}
          onFocus={elementFocusHandler}
          autoFocus>
          {title}
        </TextInput>
        <TouchableWithoutFeedback onPress={forwardPressHandler}>
          <Ionicons name="md-send" color={COLORS.BLACK} size={20} />
        </TouchableWithoutFeedback>
      </View>
    </Swipeable>
  );
}

const mapStateToDispatch = (dispatch) => {
  return {
    dispatchUpdateTasklist: (details) => dispatch(updateTasklist(details)),
  };
};
export default connect(null, mapStateToDispatch)(RenderListElement);
