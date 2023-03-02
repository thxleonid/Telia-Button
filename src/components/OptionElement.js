import React from "react"

export default function OptionElement({ option, handleOptionSelection, colorScheme }) {
    const { active, support, icon, value } = option
    //console.log(option)
    return (
        <div
            tabIndex="0"
            className={`optionElementWrapper 
                            ${active ? "option--active" : "option--disabled"}
                            ${support ? "option--support" : "option--regular"}
                            ${colorScheme}
                        `}
            onClick={() => {
                handleOptionSelection(option)
            }}
            onKeyDown={(e) => {
                console.log(e.key)
                if (e.key === "Enter" || e.key === " ") {
                    handleOptionSelection(option)
                }
            }}
        >
            <div className={"optionElement"}>
                {icon !== undefined && icon.align === "left" && <img className="optionIcon" src={icon.url} alt={icon.alt} />}
                {value && value}
                {icon !== undefined && icon.align === "right" && <img className="optionIcon" src={icon.url} alt={icon.alt} />}
            </div>
        </div>
    )
}