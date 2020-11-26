import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import styles from './style'
import { signIn } from '../../actions/AuthenticationOps'
import Form from '../Form'
import { SIGNINDATA, FORM_MESSAGES } from '../../constants/formData'

const SignInPage = ({ dispatchSignIn }) => {
    const [errorMessage, setError] = useState('')
    const [successMessage, setMessage] = useState('')
    const onSubmit = (data) => {
        const {
            UserName,
            Password
        } = data
        if (!UserName || !Password) {
            setError(FORM_MESSAGES.ALL_FIELDS_REQUIRED)
            return
        }
        setError('')
        dispatchSignIn(UserName)
    }
    return (
        <View style={styles.container}>
            <Form data={SIGNINDATA} onSubmit={onSubmit} />
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Text style={styles.successMessage}>{successMessage}</Text>
        </View>
    )
}

export default connect(null, { dispatchSignIn: signIn })(SignInPage) 