export default function CustomButton(props) {
    const {options, colorScheme} = props

    const btnStyle = {
        
    }

    const optionStyle = {

    }

    const dropdownOptions = options.map((option, index) => 
        <>
            <div>
                {option.value}
            </div>
            {index !== options.length - 1 && <hr></hr>}
        </>
    )
    return (
        <div className="dropdown">  
          <div 
            type="button"
            className={`dropbtn 
                        ${colorScheme}
                        ${props.active ? "dropbtn--enabled" : "dropbtn--disabled"
                    
                    }`}
            tabIndex={props.tabIndex}
            >{props.text}</div>
          <div className="dropdown-content">  
            {dropdownOptions}
          </div>  
        </div>  
    )
}