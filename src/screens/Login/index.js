import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, TextInput } from 'react-native-paper';
import { fetchDSB } from '@actions/dsb';
import styles from './styles';

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
        title: 'Login',
    };

    login() {
        const { fetchDSB, navigation } = this.props;
        const { username, password } = this.state;

        fetchDSB(username, password).then(() =>
            navigation.navigate('Authenticated')
        ).catch(error => {
            console.log(error);
        });
    }

    render() {
        const { auth } = this.props;
        const { username, password } = this.state;

        return (
            <View style={styles.container} >
                {auth.error && (
                    <Text style={styles.errorText}>{auth.error.message}</Text>
                )}
                <TextInput
                    style={styles.textInput}
                    mode='outlined'
                    value={username}
                    onChangeText={username => this.setState({ username })}
                    label={'Nutzername'}
                />
                <TextInput
                    style={styles.textInput}
                    mode='outlined'
                    value={password}
                    onChangeText={password => this.setState({ password })}
                    label={'Passwort'}
                    secureTextEntry
                />
                <Button onPress={this.login}>{'Login'}</Button>
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