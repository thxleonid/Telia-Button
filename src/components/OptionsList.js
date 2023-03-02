import React from "react"
import OptionElement from "./OptionElement"

export default function OptionsList({ options, handleOptionSelection, colorScheme }) {
    return options.map((option, index) =>
        <OptionElement
            option={option}
            key={index}
            handleOptionSelection={handleOptionSelection}
            colorScheme={colorScheme}
        />)

}