import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {logOut} from '../../actions/AuthenticationOps';
import {COLORS} from '../../styleAssets/colors';
import {TASK_PROGRESS_MESSAGE} from '../../constants/taskProgressMessages';
import HomeScreenHeader from '../../components/HomeScreenHeader';

const Details = (props) => {
  const {
    userName,
    taskListCount,
    totalUncompletedTask,
    totalCompletedTask,
  } = props;
  const taskStatusType =
    totalUncompletedTask === 0
      ? TASK_PROGRESS_MESSAGE.ALL_TASK_COMPLETED
      : totalUncompletedTask <= totalCompletedTask
      ? TASK_PROGRESS_MESSAGE.KEEP_IT_UP
      : TASK_PROGRESS_MESSAGE.YOU_CAN_DO_IT;

  const {message, logoName, color} = taskStatusType;
  return (
    <SafeAreaView>
      <HomeScreenHeader {...props} title={'Details'} />
      <View style={[styles.profileContainer, styles.shadowStyle]}>
        <MaterialCommunityIcons
          name="account-circle"
          color={COLORS.WHITE}
          size={70}
          style={styles.iconStyle}
        />
        <Text style={styles.profileText}>{userName}</Text>
      </View>
      <View style={[styles.tasklistCountContainer, styles.shadowStyle]}>
        <Text style={styles.tasklistText}>Tasklist Created:</Text>
        <Text style={styles.tasklistCount}>{taskListCount}</Text>
      </View>
      <View style={styles.taskCountContainer}>
        <View style={[styles.completedCountContainer, styles.shadowStyle]}>
          <Text style={styles.completedText}>Task Completed:</Text>
          <Text style={styles.completedCount}>{totalCompletedTask}</Text>
        </View>
        <View style={[styles.uncompletedContainer, styles.shadowStyle]}>
          <Text style={styles.uncompletedText}>Task Remaining:</Text>
          <Text style={styles.uncompletedCount}>{totalUncompletedTask}</Text>
        </View>
      </View>
      <View style={[styles.messageContainer, styles.shadowStyle]}>
        <Text style={styles.messageText}>{message}</Text>
        <Ionicons name={logoName} color={color} size={100} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    Authentication: {userName},
    listOfTasklistContainer: {totalNoOfTaskList: taskListCount},
    listToTaskContainer: {totalCompletedTask, totalUncompletedTask},
  } = state;
  return {
    userName,
    taskListCount,
    totalCompletedTask,
    totalUncompletedTask,
  };
};
export default connect(mapStateToProps, {dispatchLogOut: logOut})(Details);
