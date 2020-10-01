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

const configureCellDisplay = cell => {
  switch (cell.state) {
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
          style={cell.pressedForGameOver ? styles.pressedForGameOver : styles.mineCell}
          source={require("../assets/mine.png")}
        />
      )
    case "Uncovered":
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
    <TouchableHighlight style={styles.cellContainer}
      onPress={() => props.onPress()}
      onLongPress={() => props.onLongPress()}
    >
      {configureCellDisplay(props.cell)}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  cellContainer: {
    margin: 1
  },
  cell: {
    width: 40,
    height: 40
  },
  mineCell: {
    width: 40,
    height: 40,
    backgroundColor: Colours.secondaryBackground
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
