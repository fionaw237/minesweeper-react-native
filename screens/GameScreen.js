import React, { useState } from "react"
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    Alert
} from "react-native"
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
        gridCells.forEach(cell => {
            if (cell.hasMine) {
                cell.state = "Mine"
            } else if (cell.hasFlag) {
                cell.state = "FlaggedIncorrectly"
            }
        })
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

        validRows.forEach(row => {
            validColumns.forEach(column => {
                const coordinate = row.toString() + column.toString()
                if (coordinate === cell.coordinate) {
                    return
                } else {
                    surroundingCells.push(
                        gridCells.find(
                            gridCell => gridCell.coordinate == row.toString() + column.toString()
                        )
                    )
                }
            })
        })
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

    const handleZeroMinesInVicinityOfCell = cell => {
        let cellsChecked = new Set()
        cellsChecked.add(cell)
        let cellsWithZeroMines = new Set()
        cellsWithZeroMines.add(cell)

        while (cellsWithZeroMines.size != 0) {
            const cellsToCheck = [...cellsWithZeroMines]
            cellsWithZeroMines.clear()

            cellsToCheck.forEach(cellToCheck => {
                getSurroundingCells(cellToCheck).forEach(surroundingCell => {
                    if (!cellsChecked.has(surroundingCell)) {
                        cellsChecked.add(surroundingCell)
                        surroundingCell.minesInVicinity = calculateMinesInVicinity(surroundingCell)

                        if (surroundingCell.minesInVicinity == 0) {
                            cellsWithZeroMines.add(surroundingCell)
                        }
                        if (!surroundingCell.hasFlag) {
                            surroundingCell.state = "Uncovered"
                        }
                    }
                })
            })
        }
    }

    const checkForGameWon = () => {
        let clickedCellCount = gridCells.filter(cell => cell.hasFlag || cell.state == "Uncovered").length
        return clickedCellCount == (numberOfRows * numberOfColumns) - remainingFlags
    }

    const handleGameWon = () => {
        Alert.alert("You won!", "Your time was 00:00", [{ text: "Great!", style: "default" }])
        gridCells.forEach(cell => {
            if (cell.state == "Covered") {
                cell.hasFlag = true
                cell.state = "Flagged"
                setRemainingFlags(current => current - 1)
            }
        })
        setGridCells(current => [...current])
    }

    const handleCellPress = cell => {
        if (gameState == "GameOver" || gameState == "GameWon" || cell.state == "Uncovered") return

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

        if (cell.minesInVicinity == 0) {
            handleZeroMinesInVicinityOfCell(cell)
        }

        cell.state = "Uncovered"
        setGridCells(current => [...current])

        if (checkForGameWon()) {
            setGameState("GameWon")
            handleGameWon()
        }

    }

    const handleLongPress = cell => {
        if (gameState == "TimerStarted") {
            if (cell.state == "Uncovered") return
            if (cell.hasFlag) {
                cell.hasFlag = false
                cell.state = "Covered"
                setRemainingFlags(current => current + 1)
            } else if (!cell.hasFlag && remainingFlags > 0) {
                cell.hasFlag = true
                cell.state = "Flagged"
                setRemainingFlags(current => current - 1)
            } else {
                Alert.alert("No flags left!", "Remove an existing flag to place one elsewhere", [{ text: "Okay", style: "destructive" }])
            }
            setGridCells(current => [...current])
        }
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
            <View style={styles.header}>
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText}>{remainingFlags}</Text>
                </View>
                <ResetGameButton onPress={handleResetButtonPressed} gameState={gameState} />
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
