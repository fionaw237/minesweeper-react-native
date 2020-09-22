import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ResetGameButton from './ResetGameButton'

const GameScreenHeader = () => {

    const handleResetButtonPressed = () => {
        console.log("reset button pressed")
    }

    return (
        <View style={styles.header}>
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>10</Text>
            </View>
            <ResetGameButton onPress={handleResetButtonPressed} />
            <View style={styles.counterContainer}>
                <Text style={styles.counterText}>00:00</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        marginVertical: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    counterContainer: {
        width: '30%',
        backgroundColor: 'black',
        alignItems: 'center',
        padding: 10
    },
    counterText: {
        color: 'red',
        fontSize: 30,
    },
    resetButton: {
    },
})

export default GameScreenHeader
