import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import Form from '../Form'
import styles from './styles'
import { connect } from 'react-redux';
import { signUp } from '../../actions/AuthenticationOps';
import { SIGNUPDATA, FORM_MESSAGES } from '../../constants/formData'
const SignUpPage = ({ navigation, route, dispatchSignUp }) => {
    const [errorMessage, setError] = useState('')
    const [successMessage, setSuccess] = useState('')
    const onSubmit = (data) => {
        const {
            UserName,
            Password
        } = data
        if (!UserName || !Password) {
            setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED)
            return
        }
        dispatchSignUp(UserName)
    }

    return (
        <View style={styles.container}>
            <Form data={SIGNUPDATA} onSubmit={onSubmit} />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Text style={styles.successMessage}>{successMessage}</Text>
            <Button
                color='blue'
                title='Already a User?'
                onPress={() => { navigation.navigate('Sign In') }}
            />
        </View>
    )
}

export default connect(null, { dispatchSignUp: signUp })(SignUpPage) 