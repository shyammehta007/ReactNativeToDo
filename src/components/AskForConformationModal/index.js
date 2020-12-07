import React from 'react';
import {View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';
import {COLORS} from '../../styleAssets/colors';

const AskForConformationModal = (props) => {
  const {
    messageHeading = 'Title to the Modal',
    onSubmitAction = () => {},
    onCancelAction = () => {},
    toggleModal = () => {},
    isOpen = false,
    typeOfModal = 'DELETE',
  } = props;

  const cancelActionHandler = () => {
    toggleModal((prevState) => !prevState);
    onCancelAction();
  };

  const onSubmitActionHandler = () => {
    toggleModal((prevState) => !prevState);
    onSubmitAction();
  };

  return (
    <Modal isVisible={isOpen} coverScreen={true}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{messageHeading}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button
              title="Cancel"
              onPress={cancelActionHandler}
              color={COLORS.BLACK}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title={typeOfModal}
              onPress={onSubmitActionHandler}
              color={COLORS.RED}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AskForConformationModal;
