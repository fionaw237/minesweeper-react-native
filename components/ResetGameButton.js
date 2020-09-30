import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const getImageSource = (gameState) => {
  if (gameState == "ReadyToStart" || gameState == "TimerStarted") {
    return require('../assets/happy-face.png')
  } else if (gameState == "GameOver") {
    return require('../assets/sad-face.png')
  } else if (gameState == "GameWon") {
    return require('../assets/cool-face.png')
  }
}

const ResetGameButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}>
      <Image source={getImageSource(props.gameState)} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

export default ResetGameButton