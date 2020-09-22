import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'

const GridCell = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('reset button pressed')
      }}>
      <Image source={require('../assets/grid-cell-button.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

})

export default GridCell
