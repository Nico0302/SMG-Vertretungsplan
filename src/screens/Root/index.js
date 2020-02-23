import React, { PureComponent } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import color from 'color';
import { Provider as PaperProvider, DarkTheme, DefaultTheme, Colors } from 'react-native-paper';
import { eventEmitter, initialMode  } from 'react-native-dark-mode'
import themes from '@config/theme';
import Navigation from '@config/navigation';
import { VERSION_NUMBER, SYSTEM_DARK_MODE_READY } from '@config/info';
import { migrateStore, setDarkMode } from '@actions/settings';
import styles from './styles';

class Root extends PureComponent {
    componentDidMount() {
        const { version, darkMode, migrateStore, setDarkMode } = this.props;

        if (!version || version < VERSION_NUMBER) migrateStore(version);

        if (SYSTEM_DARK_MODE_READY) {
            if (initialMode === 'dark' && !darkMode) {
                setDarkMode(true)
            } else if (darkMode) {
                setDarkMode(false);
            }
    
            eventEmitter.on('currentModeChanged', newMode =>
                setDarkMode(newMode === 'dark')
            );
        }
    }

    render() {
        const { version, darkMode } = this.props;
        const palette = themes[this.props.theme].colors;
        const theme = darkMode ? 
            {
                ...DarkTheme,
                colors: {
                    ...DarkTheme.colors,
                    ...palette,
                    statusBar: Colors.black
                }
            } : {
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    ...palette
                }
            }
        const statusBarColor =
            Platform.OS === 'ios'
                ? theme.colors.primary
                : theme.colors.statusBar;

        if (!version || version < VERSION_NUMBER) return null;

        return (
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    <StatusBar
                        backgroundColor={statusBarColor}
                        barStyle={
                            darkMode || color(statusBarColor).isDark()
                                ? 'light-content'
                                : 'dark-content'
                        }
                    />
                    <Navigation />
                </View>
            </PaperProvider>
        );
    }
}

const mapStateToProps = ({ settings }) => ({
    theme: settings.theme,
    darkMode: settings.darkMode,
    version: settings.version
});

const mapDispatchToProps = {
    migrateStore,
    setDarkMode
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
