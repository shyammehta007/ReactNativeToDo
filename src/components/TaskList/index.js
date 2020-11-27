import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View, TextInput, Alert} from 'react-native';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';

import styles from './style';
import {createTask, updateTask, deleteTask} from '../../actions/TaskOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';

const deleteAlert = (props) => {
  const {dispatchDeleteTask, taskId, tasklistId} = props;
  return Alert.alert(
    MODAL_MESSAGES.TASK_DELETE_MESSAGE,
    '',
    [
      {
        text: 'Delete',
        onPress: () => {
          dispatchDeleteTask({tasklistId, taskId});
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};

const rightAction = (props) => {
  return (
    <View style={styles.deletedStyle}>
      <Button
        color="white"
        title="DELETE"
        onPress={() => {
          deleteAlert(props);
        }}
        style={styles.deletedStyle}>
        Deleted
      </Button>
    </View>
  );
};

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

  const renderTaskElement = (data) => {
    const {title, taskId, completed} = data;
    return (
      <Swipeable
        renderRightActions={() =>
          rightAction({dispatchDeleteTask, tasklistId, taskId})
        }>
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
