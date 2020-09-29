import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'

import WelcomeScreen from "../screens/WelcomeScreen"
import GameScreen from "../screens/GameScreen"
import BestTimesScreen from "../screens/BestTimesScreen"

import Colours from "../constants/colours"

const AppNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            headerTitle: ""
        }
    },
    Game: {
        screen: GameScreen,
        navigationOptions: {
            headerTitle: "Minesweeper"
        }
    },
    BestTimes: {
        screen: BestTimesScreen,
        navigationOptions: {
            headerTitle: "Best Times"
        }
    }
},
    {
        mode: "modal",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? Colours.primary : Colours.mainBackground
            },
            headerTintColor: Platform.OS === "android" ? "white" : Colours.primary
        }
    })

export default createAppContainer(AppNavigator)