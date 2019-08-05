import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import theme from '@config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface
    },
    appbar: {
        elevation: 4,
        zIndex: 2
    },
    content: {
        flex: 1
    },
    masterSwitch: {
        backgroundColor: Colors.grey600,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 58,
        paddingEnd: 16,
        paddingVertical: 4
    },
    masterSwitchText: {
        color: Colors.white,
        fontSize: 18
    }
});

export default styles;