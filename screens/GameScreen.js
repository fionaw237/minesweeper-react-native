import React from 'react'
import {View, StyleSheet} from 'react-native'

import GameScreenHeader from '../components/GameScreenHeader'
import GameBoard from '../components/GameBoard'

const GameScreen = () => {
  return (
      <View>
        <GameScreenHeader/>
        <GameBoard/>
      </View> 
  )
}

const styles = StyleSheet.create({

})

export default GameScreen;
