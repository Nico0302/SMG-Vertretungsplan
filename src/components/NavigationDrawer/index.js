import React, { Component } from 'react';
import { View, Linking, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Drawer, Divider, withTheme } from 'react-native-paper';
import { setTheme } from '@actions/settings';
import Logo from '@components/Logo';
import styles from './styles';

const houses = [ 'default', 'yellow', 'blue', 'green' ];

class NavigationDrawer extends Component {
    changeHouse = () => {
        const theme = houses[(houses.indexOf(this.props.themeName)+1)%houses.length];

        if (Platform.OS === 'android')
            ToastAndroid.show('🧙 Changed House', ToastAndroid.SHORT)

        this.props.setTheme(theme);
    }

    render() {
        const { activeItemKey, navigation, theme } = this.props;

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.header}>
                    <Logo size={100} onLongPress={this.changeHouse} />
                </View>
                <Divider />
                <View style={styles.items}>
                    <Drawer.Item
                        label='Vertretungsplan'
                        icon='format-list-bulleted'
                        active={activeItemKey === 'TimetableStack'}
                        onPress={() => navigation.navigate('TimetableStack')}
                    />
                    <Drawer.Item
                        label='Kollegium'
                        icon='account-multiple'
                        active={activeItemKey === 'TeacherStack'}
                        onPress={() => navigation.navigate('TeacherStack')}
                    />
                    <Drawer.Item
                        label='Einstellungen'
                        icon='settings'
                        active={activeItemKey === 'SettingsStack'}
                        onPress={() => navigation.navigate('SettingsStack')}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ settings }) => ({
    themeName: settings.theme
});

const mapDispatchToProps = {
    setTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(NavigationDrawer));