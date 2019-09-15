import React, { PureComponent } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Surface, Switch, Divider, List, withTheme } from 'react-native-paper';
import { VERSION_NAME } from '@config/info';
import { logout } from '@actions/auth';
import { toggleFilter, setClassFilter } from '@actions/filters';
import { setTheme } from '@actions/settings';
import LogoutDialog from './LogoutDialog';
import styles from './styles';

class Settings extends PureComponent {
    state = {
        logoutDialogVisible: false
    };

    render() {
        const { 
            filtersActive,
            filtersEmpty,
            navigation,
            toggleFilter,
            logout,
            setTheme,
            themeName,
            theme
        } = this.props;
        const { logoutDialogVisible } = this.state;

        return (
            <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                <Surface style={styles.appbar}>
                    <Appbar.Header>
                        <Appbar.Action
                            icon="menu"
                            onPress={navigation.openDrawer}
                        />
                        <Appbar.Content
                            title="Einstellungen"
                        />
                    </Appbar.Header>
                </Surface>
                <ScrollView style={styles.content}>
                    <List.Item
                        title="Filter"
                        description={filtersActive ? 'An' : filtersEmpty ? 'Leer' : 'Aus'}
                        onPress={() => navigation.navigate('Filters')}
                        left={props => (<List.Icon {...props} icon="filter-list" />)}
                        right={()=> (
                            <Switch
                                style={styles.switch}
                                value={filtersActive}
                                disabled={filtersEmpty}
                                onValueChange={() => toggleFilter()}
                            />
                        )}
                    />
                    <Divider />
                    <List.Item
                        title="Abmelden"
                        onPress={() => this.setState({ logoutDialogVisible: true })}
                        left={props => (<List.Icon {...props} icon="exit-to-app" />)}
                    />
                    <Divider />
                    <TouchableOpacity
                        onLongPress={() => setTheme(themeName === 'dark' ? 'default' : 'dark')}
                    >
                        <List.Item
                            title="Version"
                            description={VERSION_NAME}
                            left={props => (<List.Icon {...props} icon="info" />)}
                        />
                    </TouchableOpacity>
                </ScrollView>
                <LogoutDialog
                    visible={logoutDialogVisible}
                    onDismiss={() => this.setState({ logoutDialogVisible: false })}
                    onConfirm={() => {
                        logout();
                        navigation.navigate('Unauthenticated');
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    filtersActive: state.timetables.filters.isActive,
    filtersEmpty: state.timetables.filters.isEmpty,
    themeName: state.settings.theme
});

const mapDispatchToProps = {
    toggleFilter,
    setClassFilter,
    setTheme,
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(Settings));