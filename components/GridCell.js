import React from "react"
import { TouchableHighlight, Image, StyleSheet, View, Text } from "react-native"
import Colours from "../constants/colours"

const configureCellDisplay = cell => {
  if (cell.hasFlag) {
    return <Image style={styles.cell} source={require("../assets/flag.png")} />
  }
  if (!cell.uncovered) {
    return <Image style={styles.cell} source={require("../assets/grid-cell-button.png")} />
  } else if (cell.hasMine && !cell.hasFlag) {
    return (
      <Image
        style={cell.pressedForGameOver ? styles.pressedForGameOver : styles.cell}
        source={require("../assets/mine.png")}
      />
    )
  }
  return (
    <View style={styles.uncoveredCell}>
      <Text style={{ ...styles.minesNumberText, color: getCellTextColour(cell) }}>{cell.minesInVicinity.toString()}</Text>
    </View>
  )
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
      {configureCellDisplay(props.cell)}
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
  }
})

export default GridCell
