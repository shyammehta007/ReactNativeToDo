import React from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Button, FlatList } from 'react-native'
import { createTasklist, updateTasklist, deleteTasklist } from '../../actions/TaskListOps'
import { Swipeable } from 'react-native-gesture-handler'

const rightAction = ({ dispatchDeleteTasklist, tasklistId }) => {
    return (
        <View style={styles.deletedStyle}>
            <Button
                color='white'
                title='DELETE'
                onPress={() => { dispatchDeleteTasklist({ tasklistId }) }}
                style={styles.deletedStyle}>Deleted</Button>
        </View>
    )
}


const ListOfTaskLists = (props) => {
    const { navigation, route, dispatchCreateTasklist, listOfTasklistArray, dispatchUpdateTasklist, dispatchDeleteTasklist } = props

    const renderListElement = (data) => {
        const {
            tasklistId,
            title
        } = data
        return (
            <Swipeable
                renderRightActions={() => rightAction({ dispatchDeleteTasklist, tasklistId })}
            >
                <View style={styles.listElementContainer}>
                    <TextInput
                        style={styles.listElementTitle}
                        onChangeText={(e) => {
                            dispatchUpdateTasklist({ tasklistId, title: e })
                        }} autoFocus>
                        {title}
                    </TextInput>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.navigate('Details', { id: tasklistId })
                        }}>
                        <Text style={styles.detailsViewRedirection}>{'->'}</Text>
                    </TouchableWithoutFeedback>
                </View>
            </Swipeable>
        )
    }
    return (
        <View>
            <View style={styles.homeHeader}>
                <Text style={styles.headerText}> List of Tasklist  </Text>
                <Button
                    title={'+'}
                    color={'aqua'}
                    onPress={() => { dispatchCreateTasklist() }} />
            </View>
            <FlatList
                data={listOfTasklistArray}
                ItemSeparatorComponent={() => <View
                    style={{
                        height: 0.5,
                    }}
                />}
                renderItem={({ item }) => renderListElement(item)}
            />
        </View>)
}

const mapStateToProps = state => {
    const {
        listOfTasklistContainer: {
            listOfTasklistArray = []
        }
    } = state
    return {
        listOfTasklistArray
    }
}

const mapStateToDispatch = dispatch => {
    return {
        dispatchCreateTasklist: details => dispatch(createTasklist(details)),
        dispatchUpdateTasklist: details => dispatch(updateTasklist(details)),
        dispatchDeleteTasklist: details => dispatch(deleteTasklist(details))
    }
}

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



export default connect(mapStateToProps, mapStateToDispatch)(ListOfTaskLists)
