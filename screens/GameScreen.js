import React, { useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'

import GridCell from '../components/GridCell'
import ResetGameButton from '../components/ResetGameButton'
import Colours from "../constants/colours"

const GameScreen = props => {

    const selectedDifficulty = props.navigation.getParam("selectedDifficulty")

    const numberOfRows = 9
    const numberOfColumns = 9

    const numberOfMines = () => {
        if (selectedDifficulty == "Beginner") {
            return 10
        } else if (selectedDifficulty == "Intermediate") {
            return 15
        } else if (selectedDifficulty == "Advanced") {
            return 20
        }
        return 0
    }

    const [remainingFlags, setRemainingFlags] = useState(() => numberOfMines())

    const initialiseGridCells = () => {
        const result = []
        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++)
                result.push(
                    {
                        coordinate: rowNumber.toString() + columnNumber.toString(),
                        hasMine: false,
                        hasFlag: false,
                        uncovered: false
                    }
                )
        }
        return result
    }

    const arrayIndexFromCoordinate = (coordinate) => {
        return (parseInt(coordinate[0]) * numberOfColumns) + parseInt(coordinate[1])
    }

    const [gridCells, setGridCells] = useState(initialiseGridCells())

    const handleCellPress = (coordinate) => {
        gridCells[arrayIndexFromCoordinate(coordinate)].uncovered = true
        setGridCells(current => [...current])
    }

    const handleResetButtonPressed = () => {
        setGridCells(initialiseGridCells())
    }

    const renderGridCell = (cellData) => {
        return <GridCell cell={cellData.item} onPress={handleCellPress} />
    }

    return (
        <View style={styles.gameScreencontainer}>
            <View style={styles.header}>
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>{remainingFlags}</Text>
                </View>
                <ResetGameButton onPress={handleResetButtonPressed} />
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>00:00</Text>
                </View>
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList keyExtractor={item => item.coordinate} data={gridCells} renderItem={renderGridCell} numColumns={numberOfColumns} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gameScreencontainer: {
        flex: 1,
        backgroundColor: Colours.mainBackground
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    header: {
        flexDirection: 'row',
        marginVertical: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    flatlistContainer: {
        alignItems: "center"
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
    }
})

export default GameScreen
