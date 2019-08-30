import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        elevation: 0
    },
    backdrop: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 20
    },
    surface: {
        flex: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8
    },
    lessonContainer: {
        minWidth: 45,
        marginRight: 8
    },
    lessonText: {
        fontSize: 30
    }
});

export default styles;