import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Surface, Switch, List, Divider, Colors } from 'react-native-paper';
import { toggleFilter, setClassFilter, addSubjectFilter, removeSubjectFilter } from '@actions/filters';
import FilterDialog from './FilterDialog';
import styles from './styles';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterDialogVisible: false
        };
    }

    render() {
        const {
            filters,
            navigation,
            toggleFilter
        } = this.props;
        const { filterDialogVisible } = this.state;

        return (
            <View style={styles.container}>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack(null)}
                    />
                    <Appbar.Content
                        title="Filter"
                    />
                </Appbar.Header>
                <ScrollView style={styles.content}>
                    <View style={styles.masterSwitch}>
                        <List.Subheader style={styles.masterSwitchText}>Filter anwenden</List.Subheader>
                        <Switch
                            value={filters.isActive}
                            disabled={filters.isEmpty}
                            onValueChange={() => toggleFilter()}
                            trackColor={Colors.grey400}
                            thumbColor={Colors.white}
                        />
                    </View>
                    <List.Item
                        title="Klasse"
                        onPress={() => this.setState({ filterDialogVisible: true })}
                        left={props => (<List.Icon {...props} icon="class" />)}
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
    filters: state.timetables.filters
});

const mapDispatchToProps = {
    toggleFilter,
    setClassFilter,
    addSubjectFilter,
    removeSubjectFilter
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filters);