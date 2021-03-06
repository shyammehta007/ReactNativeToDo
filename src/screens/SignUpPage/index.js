import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import Form from '../../components/Form';
import {signUp} from '../../actions/AuthenticationOps';
import {AUTHDATA, FORM_MESSAGES} from '../../constants/formData';
import {COLORS} from '../../styles/colors';

const SignUpPage = (props) => {
  const {navigation, dispatchSignUp} = props;
  const [errorMessage, setError] = useState('');
  const onSubmit = (data) => {
    const {UserName, Password} = data;
    if (UserName && Password) {
      navigation.reset({
        index: 0,
        routes: [{name: 'ToDo'}],
      });
      dispatchSignUp(UserName);
      return;
    }
    setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED);
  };

  const signInRedirector = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  return (
    <View style={styles.container}>
      <Text style={styles.formHeader}>SIGN UP</Text>
      <Form formData={AUTHDATA} onSubmit={onSubmit} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button
        color={COLORS.BLUE}
        title="Already a User?"
        onPress={signInRedirector}
      />
    </View>
  );
};

const mapStateToDispatch = {
  dispatchSignUp: signUp,
};

export default connect(null, mapStateToDispatch)(SignUpPage);
