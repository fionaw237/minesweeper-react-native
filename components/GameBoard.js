import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import GridCell from './GridCell'

const GameBoard = props => {

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
            console.log("Coordinate: ", columnNumber.toString() + rowNumber.toString())

            rowArray.push(
                <GridCell key={columnNumber.toString()} cell={gridCells[arrayIndexFromCoordinate(columnNumber.toString() + rowNumber.toString())]} onPress={handleCellPress}/>
            )
        }
        return rowArray
    }

    const handleCellPress = (coordinate) => {
        gridCells[arrayIndexFromCoordinate(coordinate)].uncovered = true
        // console.log(arrayIndexFromCoordinate(coordinate))
        // console.log(gridCells[arrayIndexFromCoordinate(coordinate)])
        setGridCells(current => [...current])
    }

    return (
        <View>
            {renderGameBoard()}
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