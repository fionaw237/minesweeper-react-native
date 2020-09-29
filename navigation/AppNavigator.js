import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'

import WelcomeScreen from "../screens/WelcomeScreen"
import GameScreen from "../screens/GameScreen"
import BestTimesScreen from "../screens/BestTimesScreen" 

const AppNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Game: GameScreen,
    BestTimes: BestTimesScreen
})

export default createAppContainer(AppNavigator)