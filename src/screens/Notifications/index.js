import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import color from 'color';
import {
    Appbar,
    Switch,
    List,
    Text,
    Button,
    Divider,
    Chip,
    Colors,
    withTheme
} from 'react-native-paper';
import {
    toggleFilter,
    setClassFilter,
    addSubjectFilter,
    removeSubjectFilter
} from '@actions/notifications';
import FilterDialog from './FilterDialog';
import styles from './styles';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            classFilterDialogVisible: false,
            subjectFilterDialogVisible: false
        };
    }

    render() {
        const {
            notifications,
            navigation,
            toggleFilter,
            setClassFilter,
            addSubjectFilter,
            removeSubjectFilter,
            theme
        } = this.props;
        const {
            classFilterDialogVisible,
            subjectFilterDialogVisible
        } = this.state;
        const { fonts, colors } = theme;

        const descriptionColor = color(theme.colors.text)
            .alpha(0.54)
            .rgb()
            .string();
        const switchContainerColor = color(theme.colors.text)
            .alpha(0.34)
            .rgb()
            .string();

        return (
            <View
                style={[styles.container, { backgroundColor: colors.surface }]}>
                <Appbar.Header style={styles.appbar}>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack(null)}
                    />
                    <Appbar.Content title="Filter" />
                </Appbar.Header>
                <ScrollView style={styles.content} bounces={false}>
                    <View
                        style={[
                            styles.masterSwitch,
                            { backgroundColor: switchContainerColor }
                        ]}>
                        <Text style={[styles.masterSwitchText, fonts.regular]}>
                            Filter anwenden
                        </Text>
                        {notifications.isEmpty ? (
                            <TouchableOpacity
                                onPress={this._showClassFilterDialog}>
                                <Switch
                                    value={false}
                                    disabled
                                    color={Colors.white}
                                />
                            </TouchableOpacity>
                        ) : (
                            <Switch
                                value={notifications.isActive}
                                onValueChange={toggleFilter}
                                color={Colors.white}
                            />
                        )}
                    </View>
                    <List.Item
                        title="Klasse/MSS-Stufe"
                        description={
                            notifications.isEmpty
                                ? 'leer (tippen zum bearbeiten)'
                                : notifications.class
                        }
                        onPress={() => this._showClassFilterDialog()}
                        left={props => (
                            <List.Icon {...props} icon="account-multiple" />
                        )}
                    />
                    <Divider />
                    <List.Subheader style={styles.listSubheader}>
                        Fächer & Kurse (optional)
                    </List.Subheader>
                    <View style={styles.listRow}>
                        <List.Icon
                            style={styles.listIcon}
                            icon="book-variant"
                            color={descriptionColor}
                        />
                        <View style={styles.subjectsWrapper}>
                            <View style={styles.subjectsContainer}>
                                {notifications.subjects.length > 0 &&
                                    notifications.subjects.map(subject => (
                                        <Chip
                                            key={subject}
                                            style={styles.subject}
                                            onClose={() =>
                                                removeSubjectFilter(subject)
                                            }>
                                            {subject}
                                        </Chip>
                                    ))}
                            </View>
                            <Button
                                style={
                                    notifications.subjects.length > 0
                                        ? styles.addSubjectButton
                                        : {}
                                }
                                mode="outlined"
                                onPress={() =>
                                    this.setState({
                                        subjectFilterDialogVisible: true
                                    })
                                }>
                                Fach/Kurs hinzufügen
                            </Button>
                        </View>
                    </View>
                </ScrollView>
                <FilterDialog
                    visible={classFilterDialogVisible}
                    onDismiss={() =>
                        this.setState({ classFilterDialogVisible: false })
                    }
                    onCreate={className =>
                        this.setState({ classFilterDialogVisible: false }, () =>
                            setClassFilter(className)
                        )
                    }
                    title="Filter bearbeiten"
                    placeholder="Klasse/MSS-Stufe"
                    createText="Bestätigen"
                />
                <FilterDialog
                    visible={subjectFilterDialogVisible}
                    onDismiss={() =>
                        this.setState({ subjectFilterDialogVisible: false })
                    }
                    onCreate={subjectName => addSubjectFilter(subjectName)}
                    title="Filter hinzufügen"
                    placeholder="Fach/Kurs-Kürzel"
                    createText="Hinzufügen"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.timetables.notifications
});

const mapDispatchToProps = {
    toggleFilter,
    setClassFilter,
    addSubjectFilter,
    removeSubjectFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Notifications));
