import React from "react";

const OptionElement = ({ option, handleOptionSelection }) => {
    const { active, support, icon, value } = option;
    return (
        <div
            tabIndex="0"
            className={`option 
                        ${active ? "option--active" : "option--disabled"}
                        ${support ? "option--support" : "option--regular"}`}
            onClick={() => { handleOptionSelection(option); }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleOptionSelection(option);
                }
            }}
        >
            <div className={"option__content"}>
                {icon !== undefined && icon.align === "left" && <img className="option__content--icon" src={icon.url} alt={icon.alt} />}
                {value && value}
                {icon !== undefined && icon.align === "right" && <img className="option__content--icon" src={icon.url} alt={icon.alt} />}
            </div>
        </div>
    );
}

export default OptionElement;