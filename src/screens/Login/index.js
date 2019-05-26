import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchDSB } from '@actions/dsb';
import styles from './styles;'

class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.login = this.login.bind(this);
    }

    static navigationOptions = {
        title: 'Anmelden',
    };

    login() {
        const { fetchDSB, navigation } = this.props;
        const { username, password } = this.state;

        fetchDSB(username, password).then(() =>
            navigation.navigate('Authenticated')
        ).catch(error => {
            console.error(error);
        });
    }

    render() {
        const { auth } = this.props;

        return (
            <View >
                <Text>{auth.error ? auth.error.message : 'loading'}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    fetchDSB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);