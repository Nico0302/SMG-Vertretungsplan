import React, { Component } from 'react';
import { View, Linking, ToastAndroid, Platform } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import { Drawer, Divider } from 'react-native-paper';
import { setTheme } from '@actions/settings';
import Logo from '@components/Logo';
import styles from './styles';

const houses = [ 'default', 'yellow', 'blue', 'green' ];

class NavigationDrawer extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.activeItemKey !== this.props.activeItemKey;
    }

    changeHouse = () => {
        const theme = houses[(houses.indexOf(this.props.theme)+1)%houses.length];

        this.props.setTheme(theme);

        if (Platform.OS === 'android')
            ToastAndroid.show('🧙 Changed House', ToastAndroid.SHORT)
    }

    render() {
        const { activeItemKey, navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Logo size={100} onLongPress={this.changeHouse} />
                </View>
                <Divider />
                <View style={styles.items}>
                    <Drawer.Item
                        label='Vertretungsplan'
                        icon='list'
                        active={activeItemKey === 'TimetableStack'}
                        onPress={() => navigation.navigate('TimetableStack')}
                    />
                    <Drawer.Item
                        label='Einstellungen'
                        icon='settings'
                        active={activeItemKey === 'SettingsStack'}
                        onPress={() => navigation.navigate('SettingsStack')}
                    />
                    <Drawer.Item
                        label='Feedback'
                        icon='feedback'
                        onPress={() => Linking.openURL('https://github.com/Nico0302/SMG-Vertretungsplan/issues')}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme
});

const mapDispatchToProps = {
    setTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawer);