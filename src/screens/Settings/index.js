import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Switch, List, withTheme } from 'react-native-paper';
import { VERSION_NAME } from '@config/info';
import { logout } from '@actions/auth';
import { toggleFilter, setClassFilter } from '@actions/filters';
import { toggleHidePast } from '@actions/timetables';
import { setTheme } from '@actions/settings';
import LogoutDialog from './LogoutDialog';
import styles from './styles';

class Settings extends PureComponent {
    state = {
        logoutDialogVisible: false
    };

    onToggleDarkTheme = () =>
        this.props.setTheme(
            this.props.themeName === 'dark' ? 'default' : 'dark'
        );

    render() {
        const {
            filtersActive,
            filtersEmpty,
            hidePast,
            navigation,
            toggleFilter,
            toggleHidePast,
            logout,
            themeName,
            theme
        } = this.props;
        const { logoutDialogVisible } = this.state;

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.surface }
                ]}>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={navigation.openDrawer}
                    />
                    <Appbar.Content title="Einstellungen" />
                </Appbar.Header>
                <ScrollView style={styles.content} bounces={false}>
                    <List.Item
                        title="Filter"
                        description={
                            filtersActive ? 'An' : filtersEmpty ? 'Leer' : 'Aus'
                        }
                        onPress={() => navigation.navigate('Filters')}
                        left={props => (
                            <List.Icon {...props} icon="filter-variant" />
                        )}
                        right={() => (
                            <Switch
                                style={styles.switch}
                                value={filtersActive}
                                disabled={filtersEmpty}
                                onValueChange={() => toggleFilter()}
                            />
                        )}
                    />
                    <List.Item
                        title="Vergangene Pläne ausblenden"
                        description={
                            hidePast
                                ? 'Vergangene Pläne werden ausgeblendet'
                                : 'Vergangene Pläne werden angezeigt'
                        }
                        onPress={() => toggleHidePast()}
                        left={props => (
                            <List.Icon
                                {...props}
                                icon="calendar-remove-outline"
                            />
                        )}
                        right={() => (
                            <Switch
                                style={styles.switch}
                                value={hidePast}
                                onValueChange={() => toggleHidePast()}
                            />
                        )}
                    />
                    <List.Item
                        title="Dark Theme"
                        description={themeName === 'dark' ? 'An' : 'Aus'}
                        onPress={this.onToggleDarkTheme}
                        left={props => (
                            <List.Icon {...props} icon="brightness-4" />
                        )}
                        right={() => (
                            <Switch
                                style={styles.switch}
                                value={themeName === 'dark'}
                                onValueChange={this.onToggleDarkTheme}
                            />
                        )}
                    />
                    <List.Item
                        title="Abmelden"
                        onPress={() =>
                            this.setState({ logoutDialogVisible: true })
                        }
                        left={props => (
                            <List.Icon {...props} icon="exit-to-app" />
                        )}
                    />
                    <List.Item
                        title="Version"
                        description={VERSION_NAME}
                        left={props => (
                            <List.Icon {...props} icon="information-outline" />
                        )}
                    />
                </ScrollView>
                <LogoutDialog
                    visible={logoutDialogVisible}
                    onDismiss={() =>
                        this.setState({ logoutDialogVisible: false })
                    }
                    onConfirm={() => {
                        logout();
                        navigation.navigate('Unauthenticated');
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    filtersActive: state.timetables.filters.isActive,
    filtersEmpty: state.timetables.filters.isEmpty,
    hidePast: state.timetables.hidePast,
    themeName: state.settings.theme
});

const mapDispatchToProps = {
    toggleFilter,
    toggleHidePast,
    setClassFilter,
    setTheme,
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(Settings));
