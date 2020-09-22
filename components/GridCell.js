import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'

const GridCell = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.coordinate)}>
      <Image style = {styles.cell} source={require('../assets/grid-cell-button.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40
    }
})

export default GridCell
