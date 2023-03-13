import OptionElement from './OptionElement'
import { OptionParams } from '../types'
import React from 'react'

const OptionsList: 
    React.FunctionComponent<{options: OptionParams[]; handleOptionSelection: (option: OptionParams) => void;}> = ({ options, handleOptionSelection }) => {
    
    return  <>
            {options.map((option, index) =>
                <OptionElement
                    option={option}
                    key={index}
                    handleOptionSelection={handleOptionSelection}
                />)}
            </>
}

export default OptionsList;