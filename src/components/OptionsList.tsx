import OptionElement from './OptionElement'
import { OptionParams } from '../types'
import React from 'react'

interface IOptionsListProps {
    options: OptionParams[]; 
    handleOptionSelection: (option: OptionParams) => void;
    handleBlur: (event: React.FocusEvent<HTMLButtonElement|HTMLDivElement>) => void;
}

const OptionsList = (props: IOptionsListProps): JSX.Element => {
    const {options, handleOptionSelection, handleBlur} = props;

    return  <>
            {options.map((option: OptionParams, index: number) =>
                <OptionElement
                    option={option}
                    key={index}
                    handleOptionSelection={handleOptionSelection}
                    handleBlur={handleBlur}
                />)}
            </>
}

export default OptionsList;