import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

import styles from './style';
import {signIn} from '../../actions/AuthenticationOps';
import Form from '../../components/Form';
import {AUTHDATA, FORM_MESSAGES} from '../../constants/formData';

const SignInPage = (props) => {
  const {dispatchSignIn} = props;
  const [errorMessage, setError] = useState('');
  const onSubmit = (data) => {
    const {UserName, Password} = data;
    if (UserName && Password) {
      setError('');
      dispatchSignIn(UserName);
      return;
    }
    setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED);
  };
  return (
    <View style={styles.container}>
      <Form formData={AUTHDATA} onSubmit={onSubmit} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const mapStateToDispatch = {
  dispatchSignIn: signIn,
};

export default connect(null, mapStateToDispatch)(SignInPage);
