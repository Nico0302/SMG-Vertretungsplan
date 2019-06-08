import React, { PureComponent } from 'react';
import { View, SectionList, StatusBar, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Appbar, Snackbar, List, Subheading, Surface } from 'react-native-paper';
import theme from '@config/theme';
import { fetchTimetables } from '@actions/timetables';
import Entry from './Entry';
import styles from './styles';

class Timetable extends PureComponent {
    constructor(props) {
        super(props);

        this.fetchTimetables = this.fetchTimetables.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Vertretungsplan'
    };

    componentDidMount() {
        this.fetchTimetables();
    }

    fetchTimetables() {
        const { auth, isLoading, fetchTimetables, navigation } = this.props;

        if (auth.token) {
            if (!isLoading)
                fetchTimetables();
        } else {
            navigation.navigate('Unauthenticated');
        }
    }

    render() {
        const { sections = [], error, filter, isLoading, navigation } = this.props;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#650016" barStyle="light-content" />
                <Surface style={styles.appbar}>
                    <Appbar.Header>
                        <Appbar.Action
                            icon="menu"
                            onPress={navigation.openDrawer}
                        />
                        <Appbar.Content
                            title="Vertretungsplan"
                        />
                    </Appbar.Header>
                </Surface>
                <SectionList
                    initialNumToRender={11}
                    contentContainerStyle={error ? styles.snackbarListPadding : {}}
                    renderItem={({ item }) => (<Entry {...item} />)}
                    renderSectionHeader={({ section: { title } }) => (
                        <List.Subheader>{title}</List.Subheader>
                    )}
                    renderSectionFooter={({ section }) => section.data.length < 1 ? (
                        <View style={styles.emptySection}>
                            <Subheading>
                                {'keine Einträge' + (filter.isActive ? ` für die Klasse ${filter.data}` : '')}
                            </Subheading>
                        </View>
                    ) : null}
                    sections={sections}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={this.fetchTimetables}
                            colors={[theme.colors.primary]}
                        />
                    }
                    keyExtractor={(item, index) => item.lesson+index.toString()}
                />
                <Snackbar
                    visible={error}
                    onDismiss={() => {}}
                    action={{
                        label: 'neu laden',
                        onPress: () => this.fetchTimetables()
                    }}
                >
                    Fehler beim Aktualisieren
                </Snackbar>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isLoading: state.timetables.isLoading,
    error: state.timetables.error,
    sections: state.timetables.sections,
    filter: state.timetables.filter
});

const mapDispatchToProps = {
    fetchTimetables
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timetable);