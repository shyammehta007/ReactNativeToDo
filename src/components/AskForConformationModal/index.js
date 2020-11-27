import React from 'react';
import {Modal, View, Text} from 'react-native';

const AskForConformationModal = ({setVisiblity}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 100}}>
      <Modal
        visible={false}
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <Text style={{padding: 100}}> This lol is modall pop up he he</Text>
      </Modal>
    </View>
  );
};

export default AskForConformationModal;
