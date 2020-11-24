import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import Form from '../Form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

const SIGNUPDATA = [
    {
        name: 'UserName',
        label: 'UserName'
    },
    {
        name: 'Password',
        label: 'Password'
    }
]


const SignUpPage = ({ navigation, route }) => {
    const [errorMessage, setError] = useState('')
    const [successMessage, setMessage] = useState('')
    const {
        params: {
            setLogin
        } } = route
    const onSubmit = async (data) => {
        const {
            UserName,
            Password
        } = data
        console.log(Password)
        if (!UserName || !Password) {
            setError('Both the Fields are mandetory')
            return
        }
        try {
            const value = await AsyncStorage.getItem(UserName)
            if (value) {
                setError('User already exists with this UserName')
                return
            }
            setError('')
            setMessage('Account Successfull created ... Please wait')
            await AsyncStorage.setItem(UserName, Password)
            setLogin(true)
        }
        catch (e) {
            console.log(e)
            setError('Error while Signing Up')
        }
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

export default SignUpPage