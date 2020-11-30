import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Form from '../Form';
import {signUp} from '../../actions/AuthenticationOps';
import {AUTHDATA, FORM_MESSAGES} from '../../constants/formData';

const SignUpPage = (props) => {
  const {navigation, dispatchSignUp} = props;
  const [errorMessage, setError] = useState('');
  const onSubmit = (data) => {
    const {UserName, Password} = data;
    if (!UserName || !Password) {
      setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED);
      return;
    }
    dispatchSignUp(UserName);
  };

  return (
    <View style={styles.container}>
      <Form data={AUTHDATA} onSubmit={onSubmit} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button
        color="blue"
        title="Already a User?"
        onPress={() => {
          navigation.navigate('Sign In');
        }}
      />
    </View>
  );
};

export default connect(null, {dispatchSignUp: signUp})(SignUpPage);
