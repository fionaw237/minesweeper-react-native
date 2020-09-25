import React from "react"
import { TouchableOpacity, Image, StyleSheet, View } from "react-native"

const configureCellDisplay = (cell) => {
  if (!cell.uncovered) {
    return <Image style={styles.cell} source={require("../assets/grid-cell-button.png")} />
  }
  return <View style={styles.uncoveredCell}></View>
}

const GridCell = (props) => {

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.cell.coordinate)}>
      {configureCellDisplay(props.cell)}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40
  },
  uncoveredCell: {
    width: 40,
    height: 40,
    backgroundColor: "black"
  }
})

export default GridCell
