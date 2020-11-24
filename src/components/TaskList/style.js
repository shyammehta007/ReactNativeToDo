import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    titleContainer: {
        height: 60,
        backgroundColor: 'grey',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tasklistTitle: {
        color: 'white',
        fontSize: 20,
    },
    taskElementContainer: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    checkBoxContainer: {
        height: 20,
        width: 20,
        marginLeft: 10
    },
    checkBoxStyle: {
        height: 20,
        width: 20
    },
    taskTitle: {
        marginLeft: 10,
        width: '75%',
        color: 'midnightblue',
        fontSize: 20
    },
    deletedStyle: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles