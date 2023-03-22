import classNames from 'classnames'
import { OptionElementStates, IconAlign } from '../enum'
import { OptionParams } from '../types'

interface IOptionElementProps {
    option: OptionParams; 
    handleOptionSelection: (option: OptionParams) => void;
    handleBlur: (event: React.FocusEvent<HTMLDivElement|HTMLButtonElement>) => void;
}

const OptionElement = (props: IOptionElementProps): JSX.Element => {
    const { option, handleOptionSelection, handleBlur } = props;
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
            onBlur={handleBlur}
            className={classNames(
                'option',
                active ? OptionElementStates.ACTIVE : OptionElementStates.DISABLED,
                support ? OptionElementStates.SUPPORT : OptionElementStates.REGULAR
            )}
        >
            <div className={"option__content"}>
                {icon && icon.align === IconAlign.LEFT && <img className="option__icon" src={icon.url} alt={icon.alt} />}
                {value && value}
                {icon && icon.align === IconAlign.RIGHT && <img className="option__icon" src={icon.url} alt={icon.alt} />}
            </div>
        </div>
    );
}

export default OptionElement;