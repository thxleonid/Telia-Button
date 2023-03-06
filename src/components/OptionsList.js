import OptionElement from "./OptionElement";
import React from "react";

const OptionsList = ({ options, handleOptionSelection }) => {
    return options.map((option, index) =>
        <OptionElement
            option={option}
            key={index}
            handleOptionSelection={handleOptionSelection}
        />);
}

export default OptionsList;