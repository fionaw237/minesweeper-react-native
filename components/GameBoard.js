import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

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
            rowArray.push(<GridCell key={columnNumber.toString() + rowNumber.toString()} />)
        }
        return rowArray
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