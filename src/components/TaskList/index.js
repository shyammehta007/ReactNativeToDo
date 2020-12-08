import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

import styles from './style';
import {
  createTask,
  updateTask,
  deleteTask,
  trimTasklist,
} from '../../actions/TaskOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';
import {COLORS} from '../../styles/colors';
import PopUpMessages from '../PopUpMessage';

const TaskList = (props) => {
  const {
    route,
    dispatchCreateTask,
    dispatchDeleteTask,
    dispatchUpdateTask,
    listOfTasklistArray,
    listToTaskMap,
    navigation,
  } = props;

  const {id: tasklistId} = route.params;
  const tasklistHeading =
    listOfTasklistArray.find(
      (tasklist) => tasklist.tasklistId === tasklistId,
    ) || {};
  const {title: tasklistTitle} = tasklistHeading;
  const tasklist = _.get(listToTaskMap, tasklistId, []);

  const [isModalOpen, toggleModal] = useState(false);
  const [modalOpenerDetails, setModalDetails] = useState({});
  const [isTaskEmpty, setTaskEmpty] = useState(false);
  const [showPopupModal, setPopupState] = useState(false);

  useEffect(() => {
    navigation.setOptions({title: tasklistTitle});
  }, []);

  const rightAction = (prop) => {
    const onDeleteClick = () => {
      setModalDetails(prop);
      toggleModal((prevState) => !prevState);
    };

    return (
      <View style={styles.deletedStyle}>
        <Button
          color={COLORS.WHITE}
          title="DELETE"
          onPress={onDeleteClick}
          style={styles.deletedStyle}>
          Deleted
        </Button>
      </View>
    );
  };

  const renderTaskElement = (data) => {
    const {title, taskId, completed} = data;

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

    const elementFocusHandler = (e) => {
      const {
        nativeEvent: {text},
      } = e;
      if (text) {
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

    const rightSwipeHandler = () => rightAction({tasklistId, taskId});

    return (
      <Swipeable renderLeftActions={rightSwipeHandler}>
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
  };

  const createTaskHandler = () => {
    if (isTaskEmpty) {
      setPopupState(true);
    } else {
      dispatchCreateTask({tasklistId});
    }
  };
  const onSubmitAction = () => {
    const {tasklistId: tlId, taskId} = modalOpenerDetails;
    const dispatchData = {
      taskId,
      tasklistId: tlId,
      tasklist,
    };
    if (tasklist.length === 1) {
      setTaskEmpty(false);
    }
    dispatchDeleteTask(dispatchData);
  };

  const taskFlatlistSeparator = () => <View style={styles.seperatorStyle} />;
  const taskFlatlistKeyExtractor = (item) => item.taskId;
  const taskFlatlistItemRenderer = ({item}) => renderTaskElement(item);
  return (
    <>
      <TouchableOpacity
        onPress={createTaskHandler}
        style={styles.titleContainer}>
        <Text style={styles.addTaskTextStyle}>ADD TASK</Text>
      </TouchableOpacity>
      <FlatList
        data={tasklist}
        keyExtractor={taskFlatlistKeyExtractor}
        renderItem={taskFlatlistItemRenderer}
        ItemSeparatorComponent={taskFlatlistSeparator}
      />
      <PopUpMessages
        isOpen={showPopupModal}
        message={MODAL_MESSAGES.TASK_TITLE_EMPTY}
        toggleModal={setPopupState}
      />
      <AskForConformationModal
        messageHeading={MODAL_MESSAGES.TASK_DELETE_MESSAGE}
        onSubmitAction={onSubmitAction}
        toggleModal={toggleModal}
        isOpen={isModalOpen}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  const listOfTasklistArray = _.get(
    state,
    'listOfTasklistContainer.listOfTasklistArray',
    [],
  );
  const listToTaskMap = _.get(state, 'listToTaskContainer.listToTaskMap', []);
  return {
    listOfTasklistArray,
    listToTaskMap,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    dispatchCreateTask: (details) => dispatch(createTask(details)),
    dispatchUpdateTask: (details) => dispatch(updateTask(details)),
    dispatchDeleteTask: (details) => dispatch(deleteTask(details)),
    dispatchTrimTask: (details) => dispatch(trimTasklist(details)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(TaskList);
