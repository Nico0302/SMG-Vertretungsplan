import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: 8,
        paddingEnd: 18,
        paddingVertical: 6,
        borderLeftWidth: 4,
        borderStyle: 'solid'
    },
    lesson: {
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginEnd: 6
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
        minWidth: 30
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