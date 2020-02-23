import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center'
    },
    info: {
        marginTop: 32,
        marginHorizontal: 20,
        marginBottom: 18
    },
    textInput: {
        width: '90%',
        maxWidth: 340,
        marginHorizontal: 8,
        marginBottom: 6
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 8,
        paddingBottom: 16
    },
    button: {
        marginHorizontal: 4
    }
});

export default styles;
