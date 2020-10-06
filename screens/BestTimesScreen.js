import React from "react"
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"

import DeleteBestTimesButton from "../components/DeleteBestTimesButton"
import Colours from "../constants/colours"
import { BEST_TIMES } from "../data/dummy_data"

const bestTimesListItem = (item, position) => {
    return (
        <View key={position} style={styles.listItemContainer}>
            <Text style={styles.bestTimesText}>{position})</Text>
            <Text style={styles.bestTimesText}>{item.name}</Text>
            <Text style={styles.bestTimesText}>{item.time}</Text>
        </View>
    )
}

const bestTimesList = () => {
    return BEST_TIMES.map((time, index) => bestTimesListItem(time, index + 1))
}

const BestTimesScreen = props => {
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            {bestTimesList()}
        </ScrollView>
    )
}

const bestTimesDeletionHandler = () => {
    console.log("Delete button pressed!")
}

BestTimesScreen.navigationOptions = () => {
    return {
        headerRight: () =>  <HeaderButtons HeaderButtonComponent={DeleteBestTimesButton}>
            <Item
                title="Delete All Best Times"
                iconName="md-trash"
                onPress={() => bestTimesDeletionHandler}
            />
        </HeaderButtons>

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colours.mainBackground
    },
    listItemContainer: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: Colours.secondaryBackground,
        marginVertical: 8
    },
    bestTimesText: {
        fontSize: 18,
        fontFamily: "alegreya-sans",
        color: Colours.primary
    }
})

export default BestTimesScreen