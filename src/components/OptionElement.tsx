import React from "react";
import classNames from 'classnames';
import { OptionElementStates } from './enum.ts';


const OptionElement = ({ option, handleOptionSelection }) => {
    
    const { active, support, icon, value } = option;
    
    const optionElementClassName = classNames(
        'option',
        active ? OptionElementStates.ACTIVE : OptionElementStates.DISABLED,
        support ? OptionElementStates.SUPPORT : OptionElementStates.REGULAR
    )
    
    
    
    
    //const optionElementClassName = classNames(
    //    'option',
    //    active ? 'option--active' : 'option--disabled',
    //    support ? 'option--support' : 'option--regular'
    //)

    return (
        <div
            tabIndex={0}
            className={optionElementClassName}
            onClick={() => { handleOptionSelection(option); }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleOptionSelection(option);
                }
            }}
        >
            <div className={"option__content"}>
                {icon !== undefined && icon.align === "left" && <img className="option__icon" src={icon.url} alt={icon.alt} />}
                {value && value}
                {icon !== undefined && icon.align === "right" && <img className="option__icon" src={icon.url} alt={icon.alt} />}
            </div>
        </div>
    );
}

export default OptionElement;