import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import themes from '@config/theme';
import Navigation from '@config/navigation';
import { VERSION_NUMBER } from '@config/info';
import { migrateStore } from '@actions/settings';
import styles from './styles';

class Root extends PureComponent {
    componentDidMount() {
        const { version, migrateStore } = this.props;

        if (!version || version < VERSION_NUMBER)
            migrateStore();
    }

    render() {
        const { version } = this.props;
        const theme = themes[this.props.theme];

        if (!version || version < VERSION_NUMBER)
            return null;

        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={theme.colors.statusBar} barStyle="light-content" />
                    <Navigation />
                </View>
            </PaperProvider>
        );
    }
}

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
    version: settings.version
});

const mapDispatchToProps = {
    migrateStore
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);
