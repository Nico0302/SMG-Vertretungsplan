import React, { PureComponent } from 'react';
import { View, SectionList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { List } from 'react-native-paper';
import theme from '@config/theme';
import { fetchDSB } from '@actions/dsb';
import Entry from './Entry';
import styles from './styles';

class Timetable extends PureComponent {
    constructor(props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
    }

    static navigationOptions = {
        title: 'Vertretungsplan'
    };

    onRefresh() {
        const { auth, fetchDSB } = this.props;

        fetchDSB(auth.username, auth.password);
    }

    render() {
        const { timetables } = this.props;
        const sections = timetables.data.map(timetable => ({
            title: moment(timetable[0].date).format('dddd, DD.MM.YYYY'),
            data: timetable
        }));

        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={({ item }) => (<Entry {...item}/>)}
                    renderSectionHeader={({section: { title }}) => (
                        <List.Subheader>{title}</List.Subheader>
                    )}
                    sections={sections}
                    refreshControl={
                        <RefreshControl
                          refreshing={timetables.isLoading}
                          onRefresh={this.onRefresh}
                          colors={[ theme.colors.primary ]}
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
    fetchDSB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timetable);