import React, { useState } from "react"
import AppNavigator from "./navigation/AppNavigator"
import * as Font from "expo-font"
import { AppLoading } from "expo"

const fetchFonts = () => {
  return Font.loadAsync({
    "alegreya-sans": require("./assets/fonts/alegreya_sans_sc.ttf")
  })
}

const App = () => {
  
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(error) => console.log(error)}
    />
  }

  return (
    <AppNavigator />
  )
}

export default App
