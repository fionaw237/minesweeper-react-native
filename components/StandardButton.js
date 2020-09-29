import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

import Colours from "../constants/colours"

const StandardButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{ ...styles.button, ...props.style }}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15
    },
    buttonText: {
        textAlign: "center",
        fontSize: 22,
        color: Colours.primary
    }
})

export default StandardButton