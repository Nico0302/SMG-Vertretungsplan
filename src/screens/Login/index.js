import React, { PureComponent } from 'react';
import { View, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { SafeAreaView } from 'react-navigation';
import { Button, Text, TextInput, withTheme } from 'react-native-paper';
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

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        const { login, navigation } = this.props;
        const { username, password } = this.state;

        login(username, password)
            .then(() => navigation.navigate('Authenticated'))
            .catch(() => { });
    }

    _getErrorMessage = () => {
        const { message } = this.props.auth.error;
        let humanizedMessage = message;

        if (message === 'To many requests.') {
            const diff = -Math.round(
                moment().diff(moment(this.props.receivedAt).add(10, 's')) / 1000
            );
            humanizedMessage = 'Zu viele Anfragen!';
            if (diff > 0) {
                humanizedMessage += `\nVersuche es in ${diff} Sekunde${
                    diff > 1 ? 'n' : ''
                    } erneut.`;
            } else {
                humanizedMessage += '\nVersuche es erneut.';
            }
        }

        return humanizedMessage;
    };

    render() {
        const { auth, navigation, theme } = this.props;
        const { username, password } = this.state;

        return (
            <ScrollView
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.surface }
                ]}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollView => (this.scrollView = scrollView)}>
                <SafeAreaView style={styles.container}>
                    <KeyboardAvoidingView style={styles.content} behavior="padding">
                        <StatusBar
                            backgroundColor="#cccccc"
                            barStyle={theme.dark ? 'light-content' : 'dark-content'}
                        />
                        <View style={styles.logo}>
                            <Logo size={160} />
                        </View>
                        {auth.error && auth.error.message && (
                            <Text style={styles.errorText}>
                                {this._getErrorMessage()}
                            </Text>
                        )}
                        <TextInput
                            style={[
                                styles.textInput,
                                { backgroundColor: theme.colors.surface }
                            ]}
                            textContentType="username"
                            keyboardType="number-pad"
                            mode="outlined"
                            value={username}
                            blurOnSubmit={false}
                            onChangeText={username => this.setState({ username })}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            returnKeyType="next"
                            label="Nutzername"
                            maxLength={16}
                            disableFullscreenUI
                            selectTextOnFocus
                        />
                        <TextInput
                            ref={passwordInput =>
                                (this.passwordInput = passwordInput)
                            }
                            style={[
                                styles.textInput,
                                { backgroundColor: theme.colors.surface }
                            ]}
                            mode="outlined"
                            value={password}
                            onChangeText={password => this.setState({ password })}
                            onSubmitEditing={this.onLogin}
                            returnKeyType="done"
                            label="Passwort"
                            maxLength={16}
                            disableFullscreenUI
                            secureTextEntry
                            textContentType="password"
                        />
                        <View style={styles.actions}>
                            <Button style={styles.button} onPress={() => navigation.navigate('Register')}>
                                Zugang anfordern
                        </Button>
                            <Button
                                style={styles.button}
                                mode="contained"
                                onPress={this.onLogin}
                                loading={auth.isLoading}>
                                Login
                        </Button>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    receivedAt: state.timetables.receivedAt
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Login));
