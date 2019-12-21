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
import TeacherList from '@screens/TeacherList';
import Teacher from '@screens/Teacher';
import Times from '@screens/Times';

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
);

const teacherStack = createStackNavigator(
    {
        TeacherList
    },
    {
        initialRouteName: 'TeacherList',
        defaultNavigationOptions
    }
);

const drawerStack = createDrawerNavigator(
    {
        TimetableStack: timetableStack,
        SettingsStack: settingsStack,
        TeacherStack: teacherStack,
        Times
    },
    {
        initialRouteName: 'TimetableStack',
        defaultNavigationOptions,
        contentComponent: props => <NavigationDrawer {...props} />
    }
);

const mainStack = createStackNavigator(
    {
        DrawerStack: drawerStack,
        Teacher
    },
    {
        initialRouteName: 'DrawerStack',
        defaultNavigationOptions
    }
);

const rootStack = createSwitchNavigator(
    {
        Authenticated: mainStack,
        Unauthenticated: authStack
    },
    {
        initialRouteName: 'Authenticated'
    }
);

export default createAppContainer(rootStack);
