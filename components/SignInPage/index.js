import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import Form from '../Form'
import AsyncStorage from '@react-native-async-storage/async-storage';
const SIGNINDATA = [
    {
        name: 'UserName',
        label: 'UserName'
    },
    {
        name: 'Password',
        label: 'Password'
    }
]

const SignInPage = ({ route }) => {
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
        if (!UserName || !Password) {
            setError('Both the Fields are mandetory')
            return
        }
        try {
            const value = await AsyncStorage.getItem(UserName)
            console.log(value)
            if (!value) {
                setError('User does not exist')
                return
            }
            if (value !== Password) {
                setError('UserName and Password does not match')
                return
            }
            setError('')
            setMessage('Login Successful.... Please Wait')
            setTimeout(() => { setLogin(true) }, 1000)

        } catch (e) {
            setError('Some error while signing up')
        }

    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Form data={SIGNINDATA} onSubmit={onSubmit} />
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
            <Text style={{ color: 'yellowgreen' }}>{successMessage}</Text>
        </View>
    )
}

export default SignInPage