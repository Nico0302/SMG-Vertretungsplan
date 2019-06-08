import React, { PureComponent } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, TextInput } from 'react-native-paper';
import { login } from '@actions/auth';
import Logo from '@components/Logo';
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

    componentWillReceiveProps(newProps) {
        const { navigation } = this.props;

        if (newProps.auth.token) {
            navigation.navigate('Authenticated');
        }
    }

    login() {
        const { login } = this.props;
        const { username, password } = this.state;

        login(username, password);
    }

    render() {
        const { auth } = this.props;
        const { username, password } = this.state;

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollView => this.scrollView = scrollView}
            >
                <View style={styles.content}>
                    <StatusBar backgroundColor="#cccccc" />
                    <View style={styles.logo}>
                        <Logo size={160} />
                    </View>
                    {auth.error && auth.error.message &&  (
                        <Text style={styles.errorText}>{auth.error.message}</Text>
                    )}
                    <TextInput
                        style={styles.textInput}
                        textContentType="username"
                        keyboardType="number-pad"
                        mode="outlined"
                        value={username}
                        blurOnSubmit={false}
                        onChangeText={username => this.setState({ username })}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        returnKeyType="next"
                        label="Nutzername"
                    />
                    <TextInput
                        ref={passwordInput => this.passwordInput = passwordInput}
                        style={styles.textInput}
                        mode="outlined"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={this.login}
                        returnKeyType="done"
                        label="Passwort"
                        secureTextEntry
                    />
                    <View style={styles.actions}>
                        <Button onPress={this.login} mode="contained">Login</Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);