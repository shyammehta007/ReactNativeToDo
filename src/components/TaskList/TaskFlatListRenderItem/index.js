import React from 'react';
import {View, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Swipeable} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

import {COLORS} from '../../../styles/colors';
import styles from './style';
import {updateTask} from '../../../actions/TaskOps';

TaskElementRenderer.propTypes = {
  taskData: PropTypes.shape({
    title: PropTypes.string,
    taskId: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }),
  dispatchUpdateTask: PropTypes.func,
  tasklist: PropTypes.arrayOf(
    PropTypes.shape({
      tasklistId: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  tasklistId: PropTypes.string.isRequired,
  setTaskEmpty: PropTypes.func,
  setPopupState: PropTypes.func,
  leftAction: PropTypes.func,
};

function TaskElementRenderer(props) {
  const {
    taskData: {title, taskId, completed},
    dispatchUpdateTask,
    tasklist,
    tasklistId,
    setTaskEmpty,
    setPopupState,
    leftAction,
  } = props;

  const statusHandler = (e) => {
    const dispatchData = {
      tasklistId,
      taskId,
      updates: {
        completed: e,
      },
      tasklist,
    };
    dispatchUpdateTask(dispatchData);
  };

  const elementFocusHandler = () => {
    if (title) {
      return;
    }
    setTaskEmpty(true);
  };
  const titleEditHandler = (e) => {
    const dispatchData = {
      tasklist,
      tasklistId,
      taskId,
      updates: {
        title: e,
      },
    };
    dispatchUpdateTask(dispatchData);
    if (completed) {
      statusHandler(false);
      return;
    }
    if (e) {
      setTaskEmpty(false);
    } else {
      setTaskEmpty(true);
      setPopupState(true);
    }
  };

  const leftSwipeHandler = () => leftAction({tasklistId, taskId});

  return (
    <Swipeable renderLeftActions={leftSwipeHandler}>
      <View style={styles.taskElementContainer}>
        <MaterialCommunityIcons
          name="drag-vertical-variant"
          color={COLORS.BLACK}
          size={30}
        />
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            value={completed}
            boxType={'square'}
            style={styles.checkBoxStyle}
            onValueChange={statusHandler}
          />
        </View>
        <TextInput
          style={[styles.taskTitle, completed && styles.crossStyle]}
          placeholder={'Task Name'}
          onChangeText={titleEditHandler}
          autoFocus
          onFocus={elementFocusHandler}>
          {title}
        </TextInput>
      </View>
    </Swipeable>
  );
}

const mapStateToDispatch = (dispatch) => ({
  dispatchUpdateTask: (details) => dispatch(updateTask(details)),
});

export default connect(null, mapStateToDispatch)(TaskElementRenderer);
