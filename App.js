import React from 'react'
import {Text, StyleSheet, View} from 'react-native'

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
        // flex: 1
  }
})

export default App
