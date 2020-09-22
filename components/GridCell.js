import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'

const GridCell = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('reset button pressed')
      }}>
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
