import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Switch, Surface, List, Text, Divider, FAB, Chip, Colors, withTheme } from 'react-native-paper';
import { toggleFilter, setClassFilter, addSubjectFilter, removeSubjectFilter } from '@actions/filters';
import FilterDialog from './FilterDialog';
import styles from './styles';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classFilterDialogVisible: false,
            subjectFilterDialogVisible: false
        };
    }

    render() {
        const {
            filters,
            navigation,
            toggleFilter,
            setClassFilter,
            addSubjectFilter,
            removeSubjectFilter,
            theme
        } = this.props;
        const { classFilterDialogVisible, subjectFilterDialogVisible } = this.state;
        const { fonts } = theme;

        return (
            <View style={styles.container}>
                <Surface style={styles.appbar}>
                    <Appbar.Header style={styles.appbar}>
                        <Appbar.BackAction
                            onPress={() => navigation.goBack(null)}
                        />
                        <Appbar.Content
                            title="Filter"
                        />
                    </Appbar.Header>
                </Surface>
                <ScrollView style={styles.content} bounces={false}>
                    <View style={styles.masterSwitch}>
                        <Text
                            style={[
                                styles.masterSwitchText,
                                { fontFamily: fonts.regular }
                            ]}
                        >Filter anwenden</Text>
                        <Switch
                            value={filters.isActive}
                            disabled={filters.isEmpty}
                            onValueChange={() => toggleFilter()}
                            trackColor={Colors.grey400}
                        />
                    </View>
                    <List.Item
                        title="Klasse"
                        description={filters.isEmpty ? 'kein Filter' : filters.class}
                        onPress={() => this.setState({ classFilterDialogVisible: true })}
                        left={props => (<List.Icon {...props} icon="group" />)}
                    />
                    <Divider />
                    <List.Subheader style={styles.listSubheader}>Fächer & Kurse</List.Subheader>
                    <View style={styles.listRow}>
                        <List.Icon style={styles.listIcon} icon="class" />
                        <View style={styles.subjectsContainer}>
                            {filters.subjects.length > 0 ? filters.subjects.map(subject => (
                                <Chip
                                    key={subject}
                                    style={styles.subject}
                                    onClose={() => removeSubjectFilter(subject)}
                                >{subject}</Chip>
                            )) : (<Text>keine Filter</Text>)}
                        </View>
                    </View>
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon="class"
                    onPress={() => this.setState({ subjectFilterDialogVisible: true })}
                />
                <FilterDialog
                    visible={classFilterDialogVisible}
                    onDismiss={() => this.setState({ classFilterDialogVisible: false })}
                    onCreate={className =>
                        this.setState({ classFilterDialogVisible: false }, () =>
                            setClassFilter(className)
                        )
                    }
                    title="Filter bearbeiten"
                    placeholder="Klasse"
                    createText="OK"
                />
                <FilterDialog
                    visible={subjectFilterDialogVisible}
                    onDismiss={() => this.setState({ subjectFilterDialogVisible: false })}
                    onCreate={subjectName =>
                        addSubjectFilter(subjectName)
                    }
                    title="Filter hinzufügen"
                    placeholder="Fach/Kurs-Kürzel"
                    createText="Neu"
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
)(withTheme(Filters));