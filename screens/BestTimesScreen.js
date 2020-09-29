import React from "react"
import { View, Text, StyleSheet } from "react-native"

import Colours from "../constants/colours"

const BestTimes = props => {
    return (
        <View style={styles.screen}>
            <Text>
                Best times screen!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colours.mainBackground
    }
})

export default BestTimes