import classNames from 'classnames'
import { OptionElementStates, IconAlign } from '../enum'
import { OptionParams } from '../types'

const OptionElement: 
    React.FC<{option: OptionParams; handleOptionSelection: (option: OptionParams) => void;}> = ({ option, handleOptionSelection }) => {
    
    const { active, support, icon, value } = option;

    return (
        <div
            tabIndex={0}
            onClick={() => handleOptionSelection(option)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleOptionSelection(option);
                }
            }}
            className={classNames(
                'option',
                active ? OptionElementStates.ACTIVE : OptionElementStates.DISABLED,
                support ? OptionElementStates.SUPPORT : OptionElementStates.REGULAR
            )}
        >
            <div className={"option__content"}>
                {icon !== undefined && icon.align === IconAlign.LEFT && <img className="option__icon" src={icon.url} alt={icon.alt} />}
                {value && value}
                {icon !== undefined && icon.align === IconAlign.RIGHT && <img className="option__icon" src={icon.url} alt={icon.alt} />}
            </div>
        </div>
    );
}

export default OptionElement;