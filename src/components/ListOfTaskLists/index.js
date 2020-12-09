import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Text, View, Button, FlatList} from 'react-native';
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
import RenderListElement from './FlatIistRenderItem';

const ListOfTaskLists = (props) => {
  const {
    navigation,
    listOfTasklistArray,
    dispatchCreateTasklist,
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

  const flatListSeperator = () => <View style={styles.seperatorStyle} />;
  const flatListKeyExtractor = (item) => item.tasklistId;
  const flatListItemRenderer = ({item}) => (
    <RenderListElement
      listData={item}
      leftAction={leftAction}
      setTasklistEmpty={setTasklistEmpty}
      setPopupState={setPopupState}
      navigation={navigation}
    />
  );

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
        keyExtractor={flatListKeyExtractor}
        ItemSeparatorComponent={flatListSeperator}
        renderItem={flatListItemRenderer}
      />
      <PopUpMessages
        isOpen={showPopupModal}
        message={MODAL_MESSAGES.TASKLIST_TITLE_REQUIRED}
        toggleModal={setPopupState}
      />
      <AskForConformationModal
        messageHeading={MODAL_MESSAGES.TASKLIST_DELETE_MESSAGE}
        onSubmitAction={onSubmitHandler}
        isOpen={isModalOpen}
        toggleModal={toggleModal}
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
  return {
    listOfTasklistArray,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    dispatchCreateTasklist: (details) => dispatch(createTasklist(details)),
    dispatchDeleteTasklist: (details) => dispatch(deleteTasklist(details)),
  };
};

export default connect(mapStateToProps, mapStateToDispatch)(ListOfTaskLists);
