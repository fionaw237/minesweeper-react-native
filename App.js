import React from 'react'
import { StyleSheet, View } from 'react-native'

import GameScreen from './screens/GameScreen'

const App = () => {
  return (
    <View style={styles.gameScreenContainer}>
      <GameScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  gameScreenContainer: {
    flex: 1,
    backgroundColor: '#ccc'
  }
})

export default App
