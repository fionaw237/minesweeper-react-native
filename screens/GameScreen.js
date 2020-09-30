import React, { useState } from "react"
import { View, StyleSheet, Text, FlatList } from "react-native"

import GridCell from "../components/GridCell"
import GridCellModel from "../models/GridCellModel"
import ResetGameButton from "../components/ResetGameButton"
import Colours from "../constants/colours"
import { cos } from "react-native-reanimated"

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

    const [gameState, setGameState] = useState("ReadyToStart")
    const [remainingFlags, setRemainingFlags] = useState(() => numberOfMines())

    const initialiseGridCells = () => {
        const result = []
        for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
            for (let columnNumber = 0; columnNumber < numberOfColumns; columnNumber++)
                result.push(
                    new GridCellModel(rowNumber.toString() + columnNumber.toString())
                )
        }
        return result
    }

    const [gridCells, setGridCells] = useState(initialiseGridCells())

    const randomlydistributeMines = (firstCellPressed) => {
        let maxMineCount = numberOfMines()
        let mineCount = 0

        while (mineCount < maxMineCount) {
            let randomRow = Math.floor(Math.random() * Math.floor(numberOfRows))
            let randomColumn = Math.floor(Math.random() * Math.floor(numberOfColumns))
            let randomCoordinate = randomRow.toString() + randomColumn.toString()

            if (randomCoordinate === firstCellPressed.coordinate) {

            } else {
                let gridCell = gridCells.find(cell => cell.coordinate == randomCoordinate)
                if (!gridCell.hasMine) {
                    gridCell.hasMine = true
                    mineCount++
                }
            }
        }
    }

    const uncoverMineContainingCells = () => {
        for (let index = 0; index < gridCells.length; index++) {
            if (gridCells[index].hasMine) {
                gridCells[index].uncovered = true
            }
        }
    }

    const getSurroundingRows = cell => {
        let currentRow = parseInt(cell.coordinate[0])
        let surroundingRows = []
        for (let i = -1; i < 2; i++) {
            surroundingRows.push(currentRow + i)
        }
        return surroundingRows.filter(
            row => row >= 0 && row < numberOfRows
        )
    }

    const getSurroundingColumns = cell => {
        let currentColumn = parseInt(cell.coordinate[1])
        let surroundingColumns = []
        for (let i = -1; i < 2; i++) {
            surroundingColumns.push(currentColumn + i)
        }
        return surroundingColumns.filter(
            column => column >= 0 && column < numberOfColumns
        )
    }

    const getSurroundingCells = cell => {
        let surroundingCells = []
        const validRows = getSurroundingRows(cell)
        const validColumns = getSurroundingColumns(cell)

        for (let i = 0; i < validRows.length; i++) {
            for (let j = 0; j < validColumns.length; j++) {
                const coordinate = validRows[i].toString() + validColumns[j].toString()
                if (coordinate === cell.coordinate) {
                    continue
                } else {
                    surroundingCells.push(
                        gridCells.find(
                            gridCell => gridCell.coordinate == validRows[i].toString() + validColumns[j].toString()
                        )
                    )
                }
            }
        }
        return surroundingCells
    }

    const calculateMinesInVicinity = cell => {
        return getSurroundingCells(cell).filter(cell => cell.hasMine).length
    }

    const handleGameOver = () => {
        setGameState("GameOver")
        uncoverMineContainingCells()
        setGridCells(current => [...current])
    }

    const handleCellPress = cell => {
        if (gameState == "GameOver") return

        if (gameState == "ReadyToStart") {
            randomlydistributeMines(cell)
            // start timer
            setGameState("TimerStarted")
        }

        if (cell.hasMine) {
            cell.pressedForGameOver = true
            handleGameOver()
            return
        }

        cell.minesInVicinity = calculateMinesInVicinity(cell)

        cell.uncovered = true
        setGridCells(current => [...current])
    }

    const handleLongPress = cell => {
        cell.hasFlag = true
        setGridCells(current => [...current])
        setRemainingFlags(current => current - 1)
    }

    const handleResetButtonPressed = () => {
        setGridCells(initialiseGridCells())
        setGameState("ReadyToStart")
        setRemainingFlags(numberOfMines())
    }

    const renderGridCell = (cellData) => {
        return (
            <GridCell
                cell={cellData.item}
                onPress={() => handleCellPress(cellData.item)}
                onLongPress={() => handleLongPress(cellData.item)}
            />
        )
    }

    return (
        <View style={styles.gameScreencontainer}>
            {console.log("RENDERING!")}
            <View style={styles.header}>
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>{remainingFlags}</Text>
                </View>
                <ResetGameButton onPress={handleResetButtonPressed} gameState={gameState}/>
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
