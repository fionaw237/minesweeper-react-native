import React, { useState } from "react"
import { View, StyleSheet, Text, FlatList } from "react-native"

import GridCell from "../components/GridCell"
import GridCellModel from "../models/GridCellModel"
import ResetGameButton from "../components/ResetGameButton"
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

    const randomlydistributeMines = () => {
        let maxMineCount = numberOfMines()
        let mineCount = 0

        while (mineCount < maxMineCount) {
            let randomRow = Math.floor(Math.random() * Math.floor(numberOfRows))
            let randomColumn = Math.floor(Math.random() * Math.floor(numberOfColumns))
            let randomCoordinate = randomRow.toString() + randomColumn.toString()

            let gridCell = gridCells.find( cell => cell.coordinate == randomCoordinate )
            if (!gridCell.hasMine) {
                gridCell.hasMine = true
                mineCount++
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

    const handleGameOver = () => {
        setGameState("GameOver")
        uncoverMineContainingCells()
        setGridCells(current => [...current])
    }

    const handleCellPress = (cell) => {
        if (gameState == "GameOver") return

        if (gameState == "ReadyToStart") {
            randomlydistributeMines()
            // start timer
            setGameState("TimerStarted")
        }

        if (cell.hasMine) {
            cell.pressedForGameOver = true
            handleGameOver()
            return
        }

        cell.uncovered = true
        setGridCells(current => [...current])
    }

    const handleResetButtonPressed = () => {
        setGridCells(initialiseGridCells())
        setGameState("ReadyToStart")
    }

    const renderGridCell = (cellData) => {
        return <GridCell cell={cellData.item} onPress={() => handleCellPress(cellData.item)} />
    }

    return (
        <View style={styles.gameScreencontainer}>
            {console.log("RENDERING!")}
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
