import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Text, View, StyleSheet, ScrollView, TextInput } from 'react-native'
import { createTask, updateTask, deleteTask } from '../../actions/TaskOps'
import { FlatList, Swipeable } from 'react-native-gesture-handler'
import CheckBox from '@react-native-community/checkbox';

const rightAction = ({ dispatchDeleteTask, tasklistId, taskId }) => {
    return (
        <View style={styles.deletedStyle}>
            <Button
                color='white'
                title='DELETE'
                onPress={() => { dispatchDeleteTask({ tasklistId, taskId }) }}
                style={styles.deletedStyle}>Deleted</Button>
        </View>
    )
}

const TaskList = (props) => {
    const {
        route,
        navigation,
        dispatchCreateTask,
        dispatchDeleteTask,
        dispatchUpdateTask,
        listOfTasklistArray,
        listToTaskMap
    } = props

    const { id: tasklistId } = route.params
    const tasklistHeading = listOfTasklistArray.find(tasklist => tasklist.tasklistId === tasklistId) || {}
    const { title: tasklistTitle } = tasklistHeading
    const tasklist = listToTaskMap[tasklistId] || []

    const renderTaskElement = (data) => {
        const {
            title,
            taskId,
            completed
        } = data
        return (
            <Swipeable
                renderRightActions={() => rightAction({ dispatchDeleteTask, tasklistId, taskId })}
            >
                <View style={styles.taskElementContainer}>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            // value={true}
                            disabled={false}
                            value={completed}
                            boxType={"square"}
                            style={styles.checkBoxStyle}
                            onValueChange={(e) => {
                                dispatchUpdateTask({ tasklistId, taskId, completed: e })
                            }}
                        />
                    </View>
                    <TextInput
                        style={styles.taskTitle}
                        placeholder={'Task Name'}
                        onChangeText={(e) => {
                            dispatchUpdateTask({ tasklistId, taskId, title: e, completed })
                        }} autoFocus>
                        {title}
                    </TextInput>
                </View>
            </Swipeable>
        )
    }

    return (
        <ScrollView>
            <View style={styles.titleContainer}>
                <Text style={styles.tasklistTitle}> {tasklistTitle} </Text>
                <Button title='Add Task'
                    onPress={() => {
                        dispatchCreateTask({ tasklistId })
                    }}
                    color={'lightgreen'}
                />
            </View>
            <FlatList
                data={tasklist}
                renderItem={({ item }) => renderTaskElement(item)}
                ItemSeparatorComponent={() => <View
                    style={{
                        height: 0.5,
                    }}
                />}
            />
        </ScrollView>
    )
}
const mapStateToProps = state => {
    const {
        listOfTasklistContainer: {
            listOfTasklistArray = []
        },
        listToTaskContainer: {
            listToTaskMap = []
        }
    } = state
    return {
        listOfTasklistArray,
        listToTaskMap
    }
}

const mapStateToDispatch = dispatch => {
    return {
        dispatchCreateTask: details => dispatch(createTask(details)),
        dispatchUpdateTask: details => dispatch(updateTask(details)),
        dispatchDeleteTask: details => dispatch(deleteTask(details))
    }
}

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

export default connect(mapStateToProps, mapStateToDispatch)(TaskList)