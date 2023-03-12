import OptionsList from "./OptionsList";
import React from "react";

const margin = 10;

const CustomButton = ({ options, colorScheme, active, text, setSelectedItem }) => {
  const listPointer = React.useRef(null);
  const buttonPointer = React.useRef(null);

  const [ dropdownOpen, setDropdownOpen ] = React.useState(false);
  const [ optionsListStyle, setOptionsListStyle ] = React.useState({});

  const positionList = () => {
    if (!listPointer.current) return;

    let button = buttonPointer.current.getBoundingClientRect();
    let list = listPointer.current.getBoundingClientRect();

    // x axis list location
    let availableSpaceRight = window.innerWidth - button.left;
    let listWidth = list.width;
    let leftCoord = listWidth - availableSpaceRight + margin;

    //y axis list location
    let buttonHeight = button.height;
    let listHeight = list.height;
    let availableSpaceBottom = window.innerHeight - button.bottom - margin;

    if (availableSpaceBottom < listHeight) {
      let availableSpaceTop = button.top - margin;
      if (availableSpaceTop > list.height) {
        setOptionsListStyle({ bottom: buttonHeight });
      } else {
        if (availableSpaceTop > availableSpaceBottom) {
          setOptionsListStyle({ bottom: buttonHeight, maxHeight: availableSpaceTop });
        } else setOptionsListStyle({ height: availableSpaceBottom });
      }
    } else { setOptionsListStyle({}); }

    setOptionsListStyle(x => {
      return { ...x, left: leftCoord > 0 ? -leftCoord : 0 };
    })
  }

  const handleBlur = (event) => {
    if (!listPointer.current) return;

    if (!listPointer.current.contains(event.relatedTarget) || event.relatedTarget === null ||
        (event.relatedTarget == buttonPointer.current && dropdownOpen)) {
      setDropdownOpen(false);
    }
  }

  const handleButtonClick = () => {
    !dropdownOpen && buttonPointer.current.focus();
    active && setDropdownOpen(x => !x);
  }

  const handleOptionSelection = (option) => {
    if (option.active) {
      setDropdownOpen(false);
      setSelectedItem(option.value);
    } else buttonPointer.current.focus();
  }

  React.useEffect(positionList, [ dropdownOpen ]);

  //window resizing 
  React.useEffect(() => {
    const updateWindowDimensions = () => {
      positionList();
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);
  //window resizing 

  return (
    <div className={`wrapper ${colorScheme}`}>
      <button
        onBlur={handleBlur}
        onMouseDown={(e) => e.preventDefault()}
        className={['btn',
                  dropdownOpen && "btn--dropdown-open",
                  active ? "btn--enabled" : "btn--disabled"]
                  .filter(Boolean).join(' ')}
        ref={buttonPointer}
        onClick={handleButtonClick}
      >
      {text}<img src={"./img/arrow.png"} className="btn__icon" alt="Icon of arrow pointing right" /></button>
      {dropdownOpen &&
        <div className="dropdown" style={optionsListStyle} ref={listPointer} >
          <OptionsList
            options={options}
            handleOptionSelection={handleOptionSelection}
          />
        </div>
      }
    </div>
  );
}

export default CustomButton;