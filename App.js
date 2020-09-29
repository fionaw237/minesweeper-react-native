import React from "react"
import { StyleSheet } from "react-native"

import AppNavigator from "./navigation/AppNavigator"

const App = () => {
  return (
    <AppNavigator/>
  )
}

const styles = StyleSheet.create({
  gameScreenContainer: {
    flex: 1,
    backgroundColor: '#ccc'
  }
})

export default App
