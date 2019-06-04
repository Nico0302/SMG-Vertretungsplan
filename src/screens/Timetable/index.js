import React, { PureComponent } from 'react';
import { View, SectionList, StatusBar, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Appbar, List, Subheading, Surface } from 'react-native-paper';
import theme from '@config/theme';
import { fetchTimetables } from '@actions/timetables';
import Entry from './Entry';
import styles from './styles';

class Timetable extends PureComponent {
    constructor(props) {
        super(props);

        this.fetchTimetables = this.fetchTimetables.bind(this);
        this.generateSections = this.generateSections.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Vertretungsplan'
    };

    componentDidMount() {
        this.fetchTimetables();
    }

    fetchTimetables() {
        const { auth, fetchTimetables, navigation } = this.props;

        if (auth.isEmpty) {
            navigation.navigate('Unauthenticated');
        } else {
            fetchTimetables();
        }
    }

    generateSections() {
        const { data, filter = { isActive: false } } = this.props.timetables;

        if (data) {
            return data.map(timetable => ({
                // format date as title
                title: moment(timetable[0].date).format('dddd, DD.MM.YYYY'),
                // check if filter exists and is active
                data: filter.isActive && filter.data ?
                    // apply filter
                    timetable.filter(entry => entry.classes.find(className =>
                        className.toLowerCase().includes(filter.data.toLowerCase()))
                    )
                    : timetable
                })
            );
        }
        return [];
    }

    render() {
        const { timetables, navigation } = this.props;
        const { filter = { isActive: false } } = timetables;

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
                    renderItem={({ item }) => (<Entry {...item} />)}
                    renderSectionHeader={({ section: { title } }) => (
                        <List.Subheader>{title}</List.Subheader>
                    )}
                    renderSectionFooter={({ section }) => section.data.length < 1 ? (
                        <View style={styles.emptySection}>
                            <Subheading>
                                {'keine Inhalte' + (filter.isActive ? ` zur Klasse ${filter.data}` : '')}
                            </Subheading>
                        </View>
                    ) : null}
                    sections={this.generateSections()}
                    refreshControl={
                        <RefreshControl
                            refreshing={timetables.isLoading}
                            onRefresh={this.fetchTimetables}
                            colors={[theme.colors.primary]}
                        />
                    }
                    keyExtractor={(item, index) => item.lesson + index}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    timetables: state.timetables
});

const mapDispatchToProps = {
    fetchTimetables
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timetable);