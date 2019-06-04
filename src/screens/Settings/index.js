import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Surface, Switch, Divider, List } from 'react-native-paper';
import { logout } from '@actions/auth';
import { setTimetableFilter, toggleTimetableFilter } from '@actions/timetables';
import FilterDialog from './FilterDialog';
import styles from './styles';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterDialogVisible: false
        };
    }

    static navigationOptions = {
        drawerLabel: 'Einstellungen'
    };


    render() {
        const { 
            filter,
            navigation,
            toggleTimetableFilter,
            setTimetableFilter,
            logout
        } = this.props;
        const { filterDialogVisible } = this.state;
        const isFilterActive = filter && filter.isActive;

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
                        title="Filter aktivieren"
                        description="Vertretungsplan filtern"
                        left={props => (<List.Icon {...props} icon="filter-list" />)}
                        right={()=> (
                            <Switch
                                value={isFilterActive}
                                onValueChange={() => toggleTimetableFilter()}
                            />
                        )}
                    />
                    <List.Item
                        title="Klassen Filter"
                        style={isFilterActive ? {} : styles.deactivatedItem}
                        description={filter && filter.data ? filter.data : 'leer'}
                        left={() => (<View style={styles.leftSpacer} />)}
                        onPress={isFilterActive ? () => this.setState({ filterDialogVisible: true }) : null}
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
                <FilterDialog
                    visible={filterDialogVisible}
                    onDismiss={() => this.setState({ filterDialogVisible: false })}
                    onCreate={filter =>
                        this.setState({ filterDialogVisible: false }, () => 
                            setTimetableFilter(filter)
                        )
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    filter: state.timetables.filter
});

const mapDispatchToProps = {
    setTimetableFilter,
    toggleTimetableFilter,
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);