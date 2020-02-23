import React, { PureComponent } from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button, Paragraph, TextInput, withTheme } from 'react-native-paper';
import { openMail } from '@services/share';
import styles from './styles';

class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            className: ''
        };

        this.register = this.register.bind(this);
    }

    register() {
        const { name, className } = this.state;
        const body = `Bitte stellen Sie die Zugangsdaten für den Online-Vertretungsplan bereit.

Name: ${name}
Klasse/Stammkurs: ${className}

Diese Nachricht wurde durch die SMG Vertretungsplan App (Alpha Version) generiert.`;
        const subject = 'Zugang anfordern';

        openMail('dsb@smg-ingelheim.de', subject, body);
    }

    render() {
        const { navigation, theme } = this.props;
        const { name, className } = this.state;

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
                        <Paragraph style={styles.info}>
                            Du kannst per E-Mail die Zugangsdaten für den SMG
                            Vertretungsplan bei der Schule anfordern.
                    </Paragraph>
                        <TextInput
                            style={[
                                styles.textInput,
                                { backgroundColor: theme.colors.surface }
                            ]}
                            mode="outlined"
                            value={name}
                            blurOnSubmit={false}
                            onChangeText={name => this.setState({ name })}
                            onSubmitEditing={() => this.classInput.focus()}
                            returnKeyType="next"
                            label="Vor- & Nachname"
                        />
                        <TextInput
                            ref={classInput => (this.classInput = classInput)}
                            style={[
                                styles.textInput,
                                { backgroundColor: theme.colors.surface }
                            ]}
                            mode="outlined"
                            value={className}
                            onChangeText={className => this.setState({ className })}
                            onSubmitEditing={this.register}
                            returnKeyType="done"
                            label="Klasse/Stammkurs"
                        />
                        <View style={styles.actions}>
                            <Button style={styles.button} onPress={() => navigation.goBack()}>
                                Login
                        </Button>
                            <Button style={styles.button} onPress={this.register} mode="contained">
                                Zugang anfordern
                        </Button>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export default withTheme(Register);
