import React from 'react'
import { View, StyleSheet } from 'react-native'

import GridCell from './GridCell'

const GameBoard = props => {

    const numberOfRows = 9
    const numberOfColumns = 9

    const createGameBoard = () => {
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
                <GridCell key={columnNumber.toString()} coordinate={columnNumber.toString() + rowNumber.toString()} onPress={handleCellPress}/>
            )
        }
        return rowArray
    }

    const handleCellPress = (coordinate) => {
        console.log(coordinate)
    }

    return (
        <View>
            {createGameBoard()}
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center"
    }
})

export default GameBoard