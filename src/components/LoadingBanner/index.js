import React from 'react';
import { View, StatusBar } from 'react-native';
import styles from './styles';

const LoadingBanner = () => (
    <View style={styles.container}>
        <StatusBar backgroundColor="#cccccc" />
    </View>
);

export default LoadingBanner;