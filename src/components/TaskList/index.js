import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Text, View, TextInput} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {
  createTask,
  updateTask,
  deleteTask,
  trimTasklist,
} from '../../actions/TaskOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';
import {COLORS} from '../../styleAssets/colors';
import PopUpMessages from '../PopUpMessage';

const TaskList = (props) => {
  const {
    route,
    dispatchCreateTask,
    dispatchDeleteTask,
    dispatchUpdateTask,
    listOfTasklistArray,
    listToTaskMap,
  } = props;

  const {id: tasklistId} = route.params;
  const tasklistHeading =
    listOfTasklistArray.find(
      (tasklist) => tasklist.tasklistId === tasklistId,
    ) || {};
  const {title: tasklistTitle} = tasklistHeading;
  const tasklist = listToTaskMap[tasklistId] || [];

  const [isModalOpen, toggleModal] = useState(false);
  const [modalOpenerDetails, setModalDetails] = useState({});
  const [isTaskEmpty, setTaskEmpty] = useState(false);
  const [showPopupModal, setPopupState] = useState(false);

  const rightAction = (prop) => {
    return (
      <View style={styles.deletedStyle}>
        <Button
          color={COLORS.WHITE}
          title="DELETE"
          onPress={() => {
            setModalDetails(prop);
            toggleModal((prevState) => !prevState);
          }}
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
      if (!text) {
        setTaskEmpty(true);
      }
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
      }
      if (!e) {
        setTaskEmpty(true);
        setPopupState(true);
      } else {
        setTaskEmpty(false);
      }
    };
    return (
      <Swipeable renderRightActions={() => rightAction({tasklistId, taskId})}>
        <View style={styles.taskElementContainer}>
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
          <MaterialCommunityIcons
            name="drag-vertical-variant"
            color={COLORS.BLACK}
            size={30}
            style={styles.draggableIcon}
          />
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
      setTaskEmpty(true);
    }
    dispatchDeleteTask(dispatchData);
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.tasklistTitle}> {tasklistTitle} </Text>
        <Button
          title="Add Task"
          onPress={createTaskHandler}
          color={COLORS.LIGHTGREEN}
        />
      </View>
      <FlatList
        data={tasklist}
        keyExtractor={(item) => item.taskId}
        renderItem={({item}) => renderTaskElement(item)}
        ItemSeparatorComponent={() => <View style={styles.seperatorStyle} />}
      />
      {showPopupModal && (
        <PopUpMessages
          isOpen={isTaskEmpty}
          message={MODAL_MESSAGES.TASK_TITLE_EMPTY}
          toggleModal={setPopupState}
        />
      )}
      {isModalOpen && (
        <AskForConformationModal
          messageHeading={MODAL_MESSAGES.TASK_DELETE_MESSAGE}
          onSubmitAction={onSubmitAction}
          toggleModal={toggleModal}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const {
    listOfTasklistContainer: {listOfTasklistArray = []},
    listToTaskContainer: {listToTaskMap = []},
  } = state;
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
