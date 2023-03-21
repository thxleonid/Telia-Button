import OptionElement from './OptionElement'
import { OptionParams } from '../types'

interface IOptionsListProps {
    options: OptionParams[]; 
    handleOptionSelection: (option: OptionParams) => void;
}

const OptionsList = (props: IOptionsListProps): JSX.Element => {
    const {options, handleOptionSelection} = props;

    return  <>
            {options.map((option: OptionParams, index: number) =>
                <OptionElement
                    option={option}
                    key={index}
                    handleOptionSelection={handleOptionSelection}
                />)}
            </>
}

export default OptionsList;