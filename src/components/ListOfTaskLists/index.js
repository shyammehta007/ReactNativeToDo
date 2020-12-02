import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  FlatList,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';
import {
  createTasklist,
  updateTasklist,
  deleteTasklist,
} from '../../actions/TaskListOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';
import {COLORS} from '../../constants/colors';

const ListOfTaskLists = (props) => {
  const {
    navigation,
    dispatchCreateTasklist,
    listOfTasklistArray,
    dispatchUpdateTasklist,
    dispatchDeleteTasklist,
  } = props;

  const [isModalOpen, toggleModal] = useState(false);
  const [modalOpenerDetails, setModalDetails] = useState({});

  const leftAction = (prop) => {
    return (
      <View style={styles.deletedStyle}>
        <Button
          color="white"
          title="DELETE"
          onPress={() => {
            toggleModal(true);
            setModalDetails(prop);
          }}
          style={styles.deletedStyle}>
          Deleted
        </Button>
      </View>
    );
  };

  const renderListElement = (data) => {
    const {tasklistId, title} = data;
    return (
      <Swipeable renderLeftActions={() => leftAction({tasklistId})}>
        <View style={styles.listElementContainer}>
          <MaterialCommunityIcons
            name="drag-vertical-variant"
            color={COLORS.BLACK}
            size={30}
          />
          <TextInput
            style={styles.listElementTitle}
            onChangeText={(e) => {
              dispatchUpdateTasklist({tasklistId, title: e});
            }}
            autoFocus>
            {title}
          </TextInput>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Details', {id: tasklistId});
            }}>
            {/* <Text style={styles.detailsViewRedirection}>{'->'}</Text> */}
            <Ionicons name="md-send" color={COLORS.BLACK} size={20} />
          </TouchableWithoutFeedback>
        </View>
      </Swipeable>
    );
  };

  const onSubmitHandler = () => {
    const {tasklistId: tlId} = modalOpenerDetails;
    const payload = {
      details: {tasklistId: tlId},
      tasklistArray: listOfTasklistArray,
    };
    console.log(payload, 'submit handler');
    dispatchDeleteTasklist(payload);
  };

  return (
    <View>
      <View style={styles.homeHeader}>
        <Text style={styles.headerText}> List of Tasklist </Text>
        <Button
          title={'+'}
          color={'aqua'}
          onPress={() => {
            dispatchCreateTasklist();
          }}
        />
      </View>
      <FlatList
        data={listOfTasklistArray}
        keyExtractor={(item) => item.tasklistId}
        ItemSeparatorComponent={() => <View style={styles.seperatorStyle} />}
        renderItem={({item}) => renderListElement(item)}
      />
      {isModalOpen && (
        <AskForConformationModal
          messageHeading={MODAL_MESSAGES.TASKLIST_DELETE_MESSAGE}
          onSubmitAction={onSubmitHandler}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const {
    listOfTasklistContainer: {listOfTasklistArray = []},
  } = state;
  return {
    listOfTasklistArray,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    dispatchCreateTasklist: (details) => dispatch(createTasklist(details)),
    dispatchUpdateTasklist: (details) => dispatch(updateTasklist(details)),
    dispatchDeleteTasklist: (details) => dispatch(deleteTasklist(details)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(ListOfTaskLists);
