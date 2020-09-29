import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"

import StandardButton from "../components/StandardButton"
import Colours from "../constants/colours"

const WelcomeScreen = props => {

    const navigateToGameScreen = difficulty => {
        console.log("Difficulty: ", difficulty)
        props.navigation.navigate("Game")
    }

    return (
        <View style={styles.welcomeScreenContainer}>
            <Text style={styles.title}>Minesweeper</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={require("../assets/mine.png")}
                />
            </View>
            <View style={styles.difficultyButtonsContainer}>
                <StandardButton style={styles.difficultyButton} title="Beginner" onPress={() => {
                    navigateToGameScreen("Beginner")
                }} />
                <StandardButton style={styles.difficultyButton} title="Intermediate" onPress={() => {
                    navigateToGameScreen("Intermediate")
                }} />
                <StandardButton style={styles.difficultyButton} title="Advanced" onPress={() => {
                    navigateToGameScreen("Advanced")
                }} />
            </View>
            <View style={styles.bestTimesButtonContainer}>
                <StandardButton style={styles.bestTimesbutton} title="Best Times" onPress={() => {
                    props.navigation.navigate("BestTimes")
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeScreenContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colours.mainBackground
    },
    title: {
        fontFamily: "alegreya-sans",
        fontSize: 44,
        marginVertical: 30,
        color: Colours.primary
    },
    imageContainer: {

    },
    image: {
        width: 100,
        height: 100
    },
    difficultyButtonsContainer: {
        height: "60%",
        justifyContent: "center"
    },
    difficultyButton: {
        marginVertical: 20,
        backgroundColor: Colours.secondaryBackground
    },
    bestTimesButtonContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: Colours.secondaryBackground,
        justifyContent: "center",
        alignItems: "center"
    },
    bestTimesbutton: {
        backgroundColor: Colours.mainBackground
    }
})

export default WelcomeScreen