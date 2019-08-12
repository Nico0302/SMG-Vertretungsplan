import React, { PureComponent } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
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

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        const { login, navigation } = this.props;
        const { username, password } = this.state;

        login(username, password).then(() =>
            navigation.navigate('Authenticated')
        );
    }

    render() {
        const { auth, navigation } = this.props;
        const { username, password } = this.state;

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollView => this.scrollView = scrollView}
            >
                <SafeAreaView style={styles.content}>
                    <StatusBar backgroundColor="#cccccc" barStyle="dark-content" />
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
                        maxLength={16}
                        disableFullscreenUI
                        selectTextOnFocus
                        importantForAutofill="yes"
                    />
                    <TextInput
                        ref={passwordInput => this.passwordInput = passwordInput}
                        style={styles.textInput}
                        mode="outlined"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                        onSubmitEditing={this.onLogin}
                        returnKeyType="done"
                        label="Passwort"
                        maxLength={16}
                        disableFullscreenUI
                        secureTextEntry
                        importantForAutofill="yes"
                    />
                    <View style={styles.actions}>
                        <Button onPress={() => navigation.navigate('Register')}>Zugang anfordern</Button>
                        <Button onPress={this.onLogin} mode="contained">Login</Button>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    login
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
