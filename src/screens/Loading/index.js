import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import LoadingBanner from '@components/LoadingBanner';
import { fetchDSB } from '@actions/dsb';

class Loading extends PureComponent {
    componentDidMount() {
        const { dsb, auth, timetables, fetchDSB, navigation } = this.props;

        if (!dsb.isLoading) {
            if (auth.isEmpty) {
                navigation.navigate('Unauthenticated');
            } else if (dsb.isEmpty) {
                fetchDSB(auth.username, auth.password);
            } else if (!timetables.isLoading && !timetables.isEmpty) {
                navigation.navigate('Authenticated');
            }
        }
    }

    render() {
        return (
            <LoadingBanner />
        );
    }
}

const mapStateToProps = (state) => ({
    dsb: state.dsb,
    auth: state.auth,
    timetables: {
        isLoading: state.timetables.isLoading,
        isEmpty: state.timetables.isEmpty,
        error: state.timetables.error
    }
});

const mapDispatchToProps = {
    fetchDSB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);