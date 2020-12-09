import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Text, View, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import _ from 'lodash';

import styles from './style';
import TaskElementRenderer from './TaskFlatListRenderItem';
import {createTask, deleteTask, trimTasklist} from '../../actions/TaskOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';
import {COLORS} from '../../styles/colors';
import PopUpMessages from '../PopUpMessage';

const TaskList = (props) => {
  const {
    route,
    dispatchCreateTask,
    dispatchDeleteTask,
    dispatchTrimTask,
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
    dispatchTrimTask({tasklist, tasklistId});
  }, []);

  const leftAction = (prop) => {
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
  const taskFlatlistItemRenderer = ({item}) => (
    <TaskElementRenderer
      taskData={item}
      tasklist={tasklist}
      tasklistId={tasklistId}
      setPopupState={setPopupState}
      setTaskEmpty={setTaskEmpty}
      leftAction={leftAction}
    />
  );

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
    dispatchDeleteTask: (details) => dispatch(deleteTask(details)),
    dispatchTrimTask: (details) => dispatch(trimTasklist(details)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(TaskList);
