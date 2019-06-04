import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import NavigationDrawer from '@components/NavigationDrawer';
import Login from '@screens/Login';
import Timetable from '@screens/Timetable';
import Settings from '@screens/Settings';

const defaultNavigationOptions = {
    header: null
};

const authStack = createStackNavigator(
    {
        Login
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions
    }
);

const mainStack = createDrawerNavigator(
    {
        Timetable,
        Settings
    },
    {
        initialRouteName: 'Timetable',
        defaultNavigationOptions,
        contentComponent: props => (<NavigationDrawer {...props}/>)
    }
);

const rootStack = createSwitchNavigator(
    {
        Authenticated: mainStack,
        Unauthenticated: authStack,
    },
    {
        initialRouteName: 'Authenticated'
    }
);

export default createAppContainer(rootStack);