import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBanner from '@components/LoadingBanner';
import { fetchDSB } from '@actions/dsb';

class Loading extends Component {
    constructor(props) {
        super(props);

        this.checkAuthentication = this.checkAuthentication.bind(this);
    }
    
    componentDidMount() {
        this.checkAuthentication();
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    checkAuthentication() {
        const { dsb, auth, timetables, fetchDSB, navigation } = this.props;

        if (!dsb || !dsb.isLoading) {
            if (auth.isEmpty) {
                navigation.navigate('Unauthenticated');
            } else if (!dsb || dsb.isEmpty) {
                fetchDSB(auth.username, auth.password);
            } else {
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