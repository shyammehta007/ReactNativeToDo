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
import _ from 'lodash';

import styles from './style';
import {
  createTasklist,
  updateTasklist,
  deleteTasklist,
} from '../../actions/TaskListOps';
import {MODAL_MESSAGES} from '../../constants/modalMessages';
import AskForConformationModal from '../AskForConformationModal';
import {COLORS} from '../../styles/colors';
import PopUpMessages from '../PopUpMessage';

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
  const [isTasklistEmpty, setTasklistEmpty] = useState(false);
  const [showPopupModal, setPopupState] = useState(false);

  const leftAction = (prop) => {
    const onPressHandler = () => {
      toggleModal(true);
      setModalDetails(prop);
    };
    return (
      <View style={styles.deletedStyle}>
        <Button
          color={COLORS.WHITE}
          title="DELETE"
          onPress={onPressHandler}
          style={styles.deletedStyle}>
          Deleted
        </Button>
      </View>
    );
  };

  const renderListElement = (data) => {
    const {tasklistId, title} = data;

    const onTitleEditHandler = (e) => {
      if (!e) {
        setTasklistEmpty(true);
      } else {
        dispatchUpdateTasklist({tasklistId, title: e});
        setTasklistEmpty(false);
      }
    };

    const elementFocusHandler = (e) => {
      const {
        nativeEvent: {text},
      } = e;
      if (!text) {
        setTasklistEmpty(true);
      }
    };

    const forwardPressHandler = () => {
      if (!title) {
        setPopupState(true);
      } else {
        navigation.navigate('Tasklist', {id: tasklistId});
      }
    };
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
  };

  const onSubmitHandler = () => {
    const {tasklistId: tlId} = modalOpenerDetails;

    const payload = {
      details: {tasklistId: tlId},
      tasklistArray: listOfTasklistArray,
    };
    if (listOfTasklistArray.length === 1) {
      setTasklistEmpty(false);
    }
    dispatchDeleteTasklist(payload);
  };

  const addTasklistHandler = () => {
    if (isTasklistEmpty) {
      setPopupState(true);
    } else {
      dispatchCreateTasklist();
    }
  };
  return (
    <>
      <View style={styles.homeHeader}>
        <Text style={styles.headerText}> List of Tasklist </Text>
        <Button
          title={'+'}
          color={COLORS.LIGHTBLUE}
          onPress={addTasklistHandler}
        />
      </View>
      <FlatList
        data={listOfTasklistArray}
        keyExtractor={(item) => item.tasklistId}
        ItemSeparatorComponent={() => <View style={styles.seperatorStyle} />}
        renderItem={({item}) => renderListElement(item)}
      />
      {
        <PopUpMessages
          isOpen={showPopupModal}
          message={MODAL_MESSAGES.TASKLIST_TITLE_REQUIRED}
          toggleModal={setPopupState}
        />
      }
      {isModalOpen && (
        <AskForConformationModal
          messageHeading={MODAL_MESSAGES.TASKLIST_DELETE_MESSAGE}
          onSubmitAction={onSubmitHandler}
          isOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const listOfTasklistArray = _.get(
    state,
    'listOfTasklistContainer.listOfTasklistArray',
    [],
  );
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
