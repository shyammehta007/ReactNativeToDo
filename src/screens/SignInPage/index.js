import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import styles from './style';
import {signIn} from '../../actions/AuthenticationOps';
import Form from '../../components/Form';
import {AUTHDATA, FORM_MESSAGES} from '../../constants/formData';
import {COLORS} from '../../styles/colors';

const SignInPage = (props) => {
  const {dispatchSignIn, navigation} = props;
  const [errorMessage, setError] = useState('');
  const onSubmit = (data) => {
    const {UserName, Password} = data;
    if (UserName && Password) {
      setError('');
      navigation.reset({
        index: 0,
        routes: [{name: 'ToDo'}],
      });
      dispatchSignIn(UserName);
      return;
    }
    setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED);
  };

  const signUpRedirector = () =>
    navigation.reset({
      index: 0,
      routes: [{name: 'SignUp'}],
    });

  return (
    <View style={styles.container}>
      <Text style={styles.formHeader}>SIGN IN</Text>
      <Form formData={AUTHDATA} onSubmit={onSubmit} />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <Button
        color={COLORS.BLUE}
        title="Create a new account"
        onPress={signUpRedirector}
      />
    </View>
  );
};

const mapStateToDispatch = {
  dispatchSignIn: signIn,
};

export default connect(null, mapStateToDispatch)(SignInPage);
