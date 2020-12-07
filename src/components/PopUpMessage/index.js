import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, Button} from 'react-native';

import styles from './style';

const PopUpMessages = (props) => {
  const {message, isOpen = false, toggleModal} = props;
  const onOkayHandler = () => {
    toggleModal((prevState) => !prevState);
  };
  return (
    <Modal isVisible={isOpen}>
      <View style={styles.container}>
        <View>
          <Text>{message}</Text>
          <Button title={'OK'} onPress={onOkayHandler} />
        </View>
      </View>
    </Modal>
  );
};

export default PopUpMessages;
