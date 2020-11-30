import React from 'react';
import {View, Text, Button} from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';

const AskForConformationModal = ({
  messageHeading = 'Title to the Modal',
  onSubmitAction = () => {},
  onCancelAction = () => {},
  toggleModal = () => {},
  isOpen = false,
  typeOfModal = 'DELETE',
}) => {
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
              color="black"
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title={typeOfModal}
              onPress={onSubmitActionHandler}
              color="red"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AskForConformationModal;
