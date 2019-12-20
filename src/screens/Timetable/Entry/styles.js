import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 4,
        paddingEnd: 16,
        justifyContent: 'center',
        height: 52
    },
    lesson: {
        minWidth: 57,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginStart: 4,
        marginEnd: 6,
        borderRightWidth: 4
    },
    row: {
        flexDirection: 'row'
    },
    spaceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 16
    },
    classes: {
        fontSize: 16,
        textAlign: 'right'
    },
    subject: {
        minWidth: 32
    },
    description: {
        fontSize: 14
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default styles;
