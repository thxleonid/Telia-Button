import React from "react"
export default function CustomButton(props) {
    const listPointer = React.useRef(null)
    const buttonPointer = React.useRef(null)
    const {options, colorScheme} = props
    const margin = 10

    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const [optionsListStyle, setOptionsListStyle] = React.useState({})
    
    React.useEffect(positionList, [dropdownOpen])



    function positionList() {
      if (!listPointer.current) return
      console.log("start")
      let button = buttonPointer.current.getBoundingClientRect()
      let list = listPointer.current.getBoundingClientRect()
      
      console.log("button calculated")


      // x axis list location
      let availableSpaceRight = window.innerWidth - button.left
      let listWidth = list.width
      let leftCoord = listWidth - availableSpaceRight + margin

      //y axis list location
      let buttonHeight = button.height
      let listHeight = list.height
      let availableSpaceBottom = window.innerHeight - button.bottom - margin
      
      if (availableSpaceBottom < listHeight) {
        let availableSpaceTop = button.top - margin
        if (availableSpaceTop > list.height) {
          setOptionsListStyle({bottom: buttonHeight})
        } else {
          if (availableSpaceTop > availableSpaceBottom) {
            setOptionsListStyle({bottom: buttonHeight, maxHeight: availableSpaceTop})
          } else setOptionsListStyle({height: availableSpaceBottom})
        }
      } else {setOptionsListStyle({})}


      console.log(`leftCoord: ${leftCoord}`)
      setOptionsListStyle(x => {
        return {...x, left: leftCoord > 0 ? -leftCoord : 0}}
      )
    }


    //window resizing 
    React.useEffect(() => {
      const updateWindowDimensions = () => {
        positionList()
      };
      window.addEventListener("resize", updateWindowDimensions);
      return () => window.removeEventListener("resize", updateWindowDimensions) 
    }, []);
    //window resizing 

    

    function handleBlur(event) {
      // if the blur was because of outside focus
      // currentTarget is the parent element, relatedTarget is the clicked element
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setDropdownOpen(false)
      }
    }

    function handleButtonClick() {
      props.active && setDropdownOpen(x => !x)
    }

    function handleOptionSelection(option) {
      if (option.active) {
        console.log(option.value); 
        setDropdownOpen(false)
        props.setSelectedItem(option.value)
      }
    }


    const dropdownOptions = options.map((option, index) => 
        <div 
          key={index}
          tabIndex={props.tabIndex}
          className={option.active ? "option--active" : "option--disabled"} 
          onClick={() => { handleOptionSelection(option)}}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOptionSelection(option)
            }
          }}
          >
            <div className={`optionElement 
                                ${option.support ? "option--support" : "option--regular"}
                                ${colorScheme}
                            `}>
                {option.icon !== undefined && option.icon.align === "left" && <img className="optionIcon" src={option.icon.url} alt={option.icon.alt}/>}
                {option.value && option.value}
                {option.icon !== undefined && option.icon.align === "right" && <img className="optionIcon" src={option.icon.url} alt={option.icon.alt}/>}
            </div>
            {index !== options.length - 1 && <hr />}
        </div>
    )

    return (
        <div className="buttonBlock" onBlur={handleBlur}>  
          <div 
            type="button"
            className={`dropbtn 
                        ${colorScheme}
                        ${dropdownOpen ? "dropdownOpen" : ""}
                        ${props.active ? "dropbtn--enabled" : "dropbtn--disabled"
                    }`}
            ref={buttonPointer}
            tabIndex={props.tabIndex}
            onClick={(e) => handleButtonClick()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleButtonClick()
              }
            }}
            >{props.text}<img src={"./img/arrow.png"} className="arrowIcon" alt="Icon of arrow pointing right"/></div>
            {dropdownOpen && 
              <div className="dropdown-content" style={optionsListStyle} ref={listPointer} >  
                {dropdownOptions}
              </div>  
            }
        </div>  
    )
}