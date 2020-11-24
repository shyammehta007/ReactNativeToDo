import React, { useEffect } from 'react'
import { View, Button, Text, TextInput, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'

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

const styles = StyleSheet.create({
    fieldLabel: {
        fontSize: 18,
        color: 'olive',
        marginBottom: 5
    },
    feildInput: {
        borderWidth: 1,
        fontSize: 18,
        borderColor: 'slategrey',
        color: 'black',
        height: 30,
        padding: 2
    },
    formContainer: {
        backgroundColor: 'lightblue',
        height: '40%',
        width: '50%',
        justifyContent: "space-evenly",
        padding: 10,
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 1
    },
    submitButton: {
        height: 40,
        backgroundColor: 'purple',
        width: 100,
        textAlign: 'center',
        borderRadius: 20,
        alignSelf: "center"
    }

})

export default Form