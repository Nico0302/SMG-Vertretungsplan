import React, { PureComponent } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Surface, Switch, Divider, List } from 'react-native-paper';
import { logout } from '@actions/auth';
import { toggleFilter, setClassFilter } from '@actions/filters';
import styles from './styles';

class Settings extends PureComponent {
    render() {
        const { 
            filtersActive,
            filtersEmpty,
            navigation,
            toggleFilter,
            logout
        } = this.props;

        return (
            <View style={styles.container}>
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
                        onPress={() => {
                            logout();
                            navigation.navigate('Unauthenticated');
                        }}
                        left={props => (<List.Icon {...props} icon="exit-to-app" />)}
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    filtersActive: state.timetables.filters.isActive,
    filtersEmpty: state.timetables.filters.isEmpty
});

const mapDispatchToProps = {
    toggleFilter,
    setClassFilter,
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);