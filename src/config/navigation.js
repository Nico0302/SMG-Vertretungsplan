import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import NavigationDrawer from '@components/NavigationDrawer';
import Login from '@screens/Login';
import Register from '@screens/Register';
import Timetable from '@screens/Timetable';
import Settings from '@screens/Settings';
import Filters from '@screens/Filters';
import Entry from '@screens/Entry';

const defaultNavigationOptions = {
    header: null
};

const authStack = createStackNavigator(
    {
        Login,
        Register
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions
    }
);

const timetableStack = createStackNavigator(
    {
        Timetable,
        Entry
    },
    {
        initialRouteName: 'Timetable',
        defaultNavigationOptions
    }
);

const settingsStack = createStackNavigator(
    {
        Settings,
        Filters
    },
    {
        initialRouteName: 'Settings',
        defaultNavigationOptions
    }
)

const mainStack = createDrawerNavigator(
    {
        TimetableStack: timetableStack,
        SettingsStack: settingsStack
    },
    {
        initialRouteName: 'TimetableStack',
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