import React from "react"
import { HeaderButton } from "react-navigation-header-buttons"
import { Ionicons } from "@expo/vector-icons"

import Colours from "../constants/colours"

const DeleteBestTimesButton = props => {
    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={23}
            color={Colours.primary}
        />
    )
}

export default DeleteBestTimesButton