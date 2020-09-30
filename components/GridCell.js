import React from "react"
import { TouchableHighlight, Image, StyleSheet, View } from "react-native"

const configureCellDisplay = (cell) => {
  if (!cell.uncovered) {
    return <Image style={styles.cell} source={require("../assets/grid-cell-button.png")} />
  } else if (cell.hasMine) {
    return <Image
     style={cell.pressedForGameOver ? styles.pressedForGameOver : styles.cell} 
     source={require("../assets/mine.png")} 
     />
  }
  return <View style={styles.uncoveredCell}></View>
}

const GridCell = (props) => {

  return (
    <TouchableHighlight
      onPress={() => props.onPress(props.cell.coordinate)}>
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
    backgroundColor: "black"
  }
})

export default GridCell
