import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux'

class Timetable extends PureComponent {
    render() {
        return (
            <View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    timetables: state.timetables
});

export default connect(
    mapStateToProps
)(Timetable);