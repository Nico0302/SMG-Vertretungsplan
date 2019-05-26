import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import theme from '@config/theme';
import Loading from '@screens/Loading';
import Login from '@screens/Login';
import Timetable from '@screens/Timetable';

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: theme.colors.primary,
    },
    headerTintColor: '#fff'
}

const authStack = createStackNavigator(
    {
        Login
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions
    }
);

const mainStack = createStackNavigator(
    {
        Timetable
    },
    {
        initialRouteName: 'Timetable',
        defaultNavigationOptions
    }
);

const rootStack = createSwitchNavigator(
    {
        Loading,
        Unauthenticated: authStack,
        Authenticated: mainStack
    },
    {
        initialRouteName: 'Loading'
    }
);

export default createAppContainer(rootStack);