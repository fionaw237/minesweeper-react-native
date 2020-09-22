import React from 'react'
import {TouchableOpacity, Image, StyleSheet} from 'react-native'

const ResetGameButton = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('reset button pressed')
      }}>
      <Image source={require('../assets/happy-face.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

export default ResetGameButton