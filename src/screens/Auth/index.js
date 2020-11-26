import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SignUpPage from '../../components/SignUpPage';
import SignInPage from '../../components/SignInPage';
import MainTabNavigator from '../MainTabNavigator';
import Loader from '../Loader';

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();

const Auth = ({ userToken, isLoading }) => {
    if (isLoading) {
        return (<Loader />)
    }
    if (userToken) {
        return (
            <Drawer.Navigator>
                <Drawer.Screen name='To Do' component={MainTabNavigator} />
            </Drawer.Navigator>
        )
    }
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontSize: 20
                }
            }}
        >
            <Tab.Screen name='Sign Up' component={SignUpPage} />
            <Tab.Screen name='Sign In' component={SignInPage} />
        </Tab.Navigator>
    )
}

const mapStateToProps = state => {
    const {
        Authentication: {
            userToken,
            isLoading
        }
    } = state
    return {
        userToken,
        isLoading
    }
}

export default connect(mapStateToProps)(Auth) 