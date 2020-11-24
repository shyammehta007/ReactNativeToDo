import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    homeHeader: {
        height: 60,
        backgroundColor: 'darkslategrey',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: 'white',
        fontSize: 18
    },
    listElementContainer: {
        flexDirection: "row",
        height: 60,
        backgroundColor: 'darkgrey',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    listElementTitle: {
        backgroundColor: 'darkgrey',
        color: 'navy',
        width: '75%',
        fontSize: 20,
        padding: 3
    },
    detailsViewRedirection: {
        color: 'white',
        fontSize: 25
    },
    deletedStyle: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles