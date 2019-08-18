import { StyleSheet, Platform } from 'react-native';
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
        backgroundColor: Colors.grey500,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: 72,
        paddingEnd: 16,
        height: 56
    },
    masterSwitchText: {
        color: Colors.white,
        fontSize: Platform.OS === 'ios' ? 16 : 19
    },
    listSubheader: {
        marginStart: 56,
        paddingBottom: 0
    },
    listRow: {
        flex: 1,
        flexDirection: 'row'
    },
    listIcon: {
        width: 56
    },
    subjectsWrapper: {
        flex: 1,
        paddingEnd: 16,
        paddingVertical: 12
    },
    subjectsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    subject: {
        flex: 0,
        marginEnd: 4,
        marginBottom: 4
    },
    addSubjectButton: {
        marginTop: 8
    }
});

export default styles;