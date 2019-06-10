import React, { PureComponent } from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Button, Paragraph, TextInput } from 'react-native-paper';
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
        const { name, className, navigation } = this.state;
        const body = 
        `Bitte stellen Sie die Zugangsdaten für den Online-Vertretungsplan bereit.
Name: ${name}
Klasse: ${className}
Diese Nachricht wurde durch die SMG Vertretungsplan App (Alpha Version) generiert.`;

        Linking.openURL(`mailto:dsb@smg-ingelheim.de?subject=Zugangsdaten anfordern&body=${body}`);
    }

    render() {
        const { name, className } = this.state;

        return (
            <ScrollView
                style={styles.container}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                bounces={false}
                ref={scrollView => this.scrollView = scrollView}
            >
                <View style={styles.content}>
                    <Paragraph style={styles.info}>Du kannst per E-Mail die Zugangsdaten für den SMG Vertretungsplan bei der Schule anfordern.</Paragraph>
                    <TextInput
                        style={styles.textInput}
                        mode="outlined"
                        value={name}
                        blurOnSubmit={false}
                        onChangeText={name => this.setState({ name })}
                        onSubmitEditing={() => this.classInput.focus()}
                        returnKeyType="next"
                        label="Vor- & Nachname"
                    />
                    <TextInput
                        ref={classInput => this.classInput = classInput}
                        style={styles.textInput}
                        mode="outlined"
                        value={className}
                        onChangeText={className => this.setState({ className })}
                        onSubmitEditing={this.register}
                        returnKeyType="done"
                        label="Klasse"
                    />
                    <View style={styles.actions}>
                        <Button onPress={this.register} mode="contained">Zugang anfordern</Button>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default Register;