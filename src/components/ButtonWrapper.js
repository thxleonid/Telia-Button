import React from "react"
import OptionsList from "./OptionsList"

const margin = 10

export default function CustomButton({ options, colorScheme, active, text, setSelectedItem }) {
  const listPointer = React.useRef(null)
  const buttonPointer = React.useRef(null)

  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [optionsListStyle, setOptionsListStyle] = React.useState({})

  function positionList() {
    if (!listPointer.current) return

    let button = buttonPointer.current.getBoundingClientRect()
    let list = listPointer.current.getBoundingClientRect()

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
        setOptionsListStyle({ bottom: buttonHeight })
      } else {
        if (availableSpaceTop > availableSpaceBottom) {
          setOptionsListStyle({ bottom: buttonHeight, maxHeight: availableSpaceTop })
        } else setOptionsListStyle({ height: availableSpaceBottom })
      }
    } else { setOptionsListStyle({}) }

    setOptionsListStyle(x => {
      return { ...x, left: leftCoord > 0 ? -leftCoord : 0 }
    }
    )
  }

  function handleBlur(event) {
    if (!listPointer.current.contains(event.relatedTarget) || event.relatedTarget === null ||
        (event.relatedTarget == buttonPointer.current && dropdownOpen)) {
      setDropdownOpen(false)
    }
  }

  function handleButtonClick() {
    !dropdownOpen && buttonPointer.current.focus()
    active && setDropdownOpen(x => !x) 
  }

  function handleOptionSelection(option) {
    if (option.active) {
      console.log(`setting option ${option.value}`)
      setDropdownOpen(false)
      setSelectedItem(option.value)
    } else buttonPointer.current.focus()
  }

  React.useEffect(positionList, [dropdownOpen])

  //window resizing 
  React.useEffect(() => {
    const updateWindowDimensions = () => {
      positionList()
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, []);
  //window resizing 

  return (
    <div className="buttonWrapper">
      <button
        onBlur={handleBlur}
        onMouseDown={(e) => e.preventDefault()}
        className={`dropButton 
                        ${colorScheme}
                        ${dropdownOpen && "dropdownOpen"}
                        ${active ? "dropButton--enabled" : "dropButton--disabled"
          }`}
        ref={buttonPointer}

        onClick={handleButtonClick}
      >{text}<img src={"./img/arrow.png"} className="arrowIcon" alt="Icon of arrow pointing right" /></button>
      {dropdownOpen &&
        <div className="dropdown-content" style={optionsListStyle} ref={listPointer} >
          <OptionsList
            options={options}
            handleOptionSelection={handleOptionSelection}
            colorScheme={colorScheme}
          />
        </div>
      }
    </div>
  )
}