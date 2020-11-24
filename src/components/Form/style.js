import { StyleSheet } from 'react-native'
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

export default styles