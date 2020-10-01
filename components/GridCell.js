import React from "react"
import {
  TouchableHighlight,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text
} from "react-native"
import Colours from "../constants/colours"

const getCellState = (cell, gameState) => {
  if (cell.hasFlag) {
    if (gameState == "GameOver" && !cell.hasMine) {
      return "FlaggedIncorrectly"
    }
    return "Flagged"
  } else if (!cell.uncovered) {
    return "Covered"
  } else if (cell.hasMine && !cell.hasFlag) {
    return "Mine"
  }
  return "MinesInVicinity"
}

const configureCellDisplay = (cell, gameState) => {
  const cellState = getCellState(cell, gameState)

  switch (cellState) {
    case "Covered":
      return <Image style={styles.cell} source={require("../assets/grid-cell-button.png")} />
    case "Flagged":
      return (
        <ImageBackground style={{ width: 40, height: 40 }} source={require("../assets/grid-cell-button.png")}>
          <View style={styles.flagImageContainer}>
            <Image style={styles.flagImage} source={require("../assets/flag.png")} />
          </View>
        </ImageBackground>
      )
    case "FlaggedIncorrectly":
      return (
        <ImageBackground style={{ width: 40, height: 40 }} source={require("../assets/grid-cell-button.png")}>
          <ImageBackground style={{ width: 40, height: 40 }} source={require("../assets/mine.png")}>
            <View style={styles.flagImageContainer}>
              <Image style={styles.cell} source={require("../assets/cross.png")} />
            </View>
          </ImageBackground>
        </ImageBackground>
      )
    case "Mine":
      return (
        <Image
          style={cell.pressedForGameOver ? styles.pressedForGameOver : styles.cell}
          source={require("../assets/mine.png")}
        />
      )
    case "MinesInVicinity":
      return (
        <View style={styles.uncoveredCell}>
          <Text style={{ ...styles.minesNumberText, color: getCellTextColour(cell) }}>{cell.minesInVicinity.toString()}</Text>
        </View>
      )
  }
}

const getCellTextColour = cell => {
  const colours = ["transparent", "blue", "green", "red", "purple", "magenta", "cyan", "black", "gray"]
  return colours[cell.minesInVicinity]
}

const GridCell = props => {
  return (
    <TouchableHighlight
      onPress={() => props.onPress()}
      onLongPress={() => props.onLongPress()}
    >
      {configureCellDisplay(props.cell, props.gameState)}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40
  },
  pressedForGameOver: {
    width: 40,
    height: 40,
    backgroundColor: "red"
  },
  uncoveredCell: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colours.secondaryBackground
  },
  minesNumberText: {
    fontSize: 16
  },
  flagImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  flagImage: {
    width: 30,
    height: 30
  }
})

export default GridCell
