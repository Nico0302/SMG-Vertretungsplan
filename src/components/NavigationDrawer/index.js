import React, { Component } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Drawer, Divider } from 'react-native-paper';
import Logo from '@components/Logo';
import styles from './styles';

class NavigationDrawer extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.activeItemKey !== this.props.activeItemKey;
    }

    render() {
        const { activeItemKey, items, navigation, onItemPress } = this.props;
        console.log(items)
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Logo size={100} />
                </View>
                <Divider />
                <View style={styles.items}>
                    <Drawer.Item
                        label='Vertretungsplan'
                        icon='list'
                        active={activeItemKey === 'Timetable'}
                        onPress={() => onItemPress({ route: { routeName: 'Timetable' }, focused: activeItemKey === 'Timetable' })}
                    />
                    <Drawer.Item
                        label='Einstellungen'
                        icon='settings'
                        active={activeItemKey === 'Settings'}
                        onPress={() => onItemPress({ route: { routeName:  'Settings' }, focused: activeItemKey === 'Settings' })}
                    />
                    <Drawer.Item
                        label='Feedback'
                        icon='feedback'
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default NavigationDrawer;