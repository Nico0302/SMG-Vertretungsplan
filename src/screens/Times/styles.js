import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lesson: {
        flex: 0,
        justifyContent: 'center',
        width: 40,
        marginEnd: 16
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    activeRow: {
        marginVertical: 6,
        paddingHorizontal: 8
    },
    activeRowWrapper: {
        paddingHorizontal: 8
    },
    evenRow: {
        borderBottomWidth: 0
    }
});

export default styles;
