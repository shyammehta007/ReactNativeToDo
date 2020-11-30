import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button, Text, View, TextInput} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import styles from './style';
import {createTask, updateTask, deleteTask} from '../../actions/TaskOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';

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

  const rightAction = (prop) => {
    return (
      <View style={styles.deletedStyle}>
        <Button
          color="white"
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
    return (
      <Swipeable renderRightActions={() => rightAction({tasklistId, taskId})}>
        <View style={styles.taskElementContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              // value={true}
              disabled={false}
              value={completed}
              boxType={'square'}
              style={styles.checkBoxStyle}
              onValueChange={(e) => {
                dispatchUpdateTask({tasklistId, taskId, completed: e});
              }}
            />
          </View>
          <TextInput
            style={styles.taskTitle}
            placeholder={'Task Name'}
            onChangeText={(e) => {
              dispatchUpdateTask({tasklistId, taskId, title: e, completed});
            }}
            autoFocus>
            {title}
          </TextInput>
        </View>
      </Swipeable>
    );
  };

  const onSubmitAction = () => {
    const {tasklistId: tlId, taskId} = modalOpenerDetails;
    dispatchDeleteTask({taskId, tasklistId: tlId});
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.tasklistTitle}> {tasklistTitle} </Text>
        <Button
          title="Add Task"
          onPress={() => {
            dispatchCreateTask({tasklistId});
          }}
          color={'lightgreen'}
        />
      </View>
      <FlatList
        data={tasklist}
        keyExtractor={(item) => item.taskId}
        renderItem={({item}) => renderTaskElement(item)}
        ItemSeparatorComponent={() => <View style={styles.seperatorStyle} />}
      />
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
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(TaskList);
