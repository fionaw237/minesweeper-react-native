import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import GridCell from '../components/GridCell'
import ResetGameButton from '../components/ResetGameButton'
import Colours from "../constants/colours"

const GameBoard = props => {

    const selectedDifficulty = props.navigation.getParam("selectedDifficulty")

    const numberOfRows = 9
    const numberOfColumns = 9

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

    const renderGameBoard = () => {
        const rowsArray = []
        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            rowsArray.push(
                <View key={rowNumber} style={styles.rowContainer}>
                    {createRow(rowNumber)}
                </View>
            )
        }
        return rowsArray
    }

    const createRow = (rowNumber) => {
        const rowArray = []
        for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++) {
            rowArray.push(
                <GridCell key={columnNumber.toString()} cell={gridCells[arrayIndexFromCoordinate(columnNumber.toString() + rowNumber.toString())]} onPress={handleCellPress} />
            )
        }
        return rowArray
    }

    const handleCellPress = (coordinate) => {
        gridCells[arrayIndexFromCoordinate(coordinate)].uncovered = true
        setGridCells(current => [...current])
    }

    const handleResetButtonPressed = () => {
       setGridCells(initialiseGridCells())
    }

    return (
        <View style={styles.gameScreencontainer}>
            <View style={styles.header}>
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>10</Text>
                </View>
                <ResetGameButton onPress={handleResetButtonPressed} />
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>00:00</Text>
                </View>
            </View>
            <View>
                {renderGameBoard()}
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

export default GameBoard
