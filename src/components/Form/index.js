import React, { useEffect } from 'react'
import { View, Button, Text, TextInput, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import styles from './style'

const Form = (props) => {
    const { register, handleSubmit, setValue } = useForm()
    const { data, onSubmit } = props
    useEffect(() => {
        data.map(({ name }) => { register(name) })
    }, [register])
    return (
        <View style={styles.formContainer}>
            {
                data.map(({ name, label }) => {
                    return (
                        <View key={name}>
                            <Text style={styles.fieldLabel}>{label}</Text>
                            <TextInput placeholder={name} style={styles.feildInput} onChangeText={(text) => setValue(name, text)}></TextInput>
                        </View>
                    )
                })
            }
            <View style={styles.submitButton}>
                <Button
                    title='Submit'
                    color='white'
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    )
}



export default Form