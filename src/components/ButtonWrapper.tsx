import classNames from 'classnames'
import { ColorScheme, ButtonStates } from '../enum'
import OptionsList from './OptionsList'
import { OptionParams } from '../types'
import React, { FocusEvent, Dispatch, SetStateAction } from 'react'

const margin = 10;

const CustomButton:
  React.FunctionComponent<{options: OptionParams[]; colorScheme: ColorScheme; active: boolean; text: string; setSelectedItem: Dispatch<SetStateAction<string|undefined>>}> = ({ options, colorScheme, active, text, setSelectedItem }) => {
  
  const listPointer = React.useRef<HTMLDivElement>(null);
  const buttonPointer = React.useRef<HTMLButtonElement>(null);

  const [ dropdownOpen, setDropdownOpen ] = React.useState(false);
  const [ optionsListStyle, setOptionsListStyle ] = React.useState({});

  const positionList = () => {
    if (!listPointer.current || !buttonPointer.current) return;

    const button = buttonPointer.current.getBoundingClientRect();
    const list = listPointer.current.getBoundingClientRect();

    // x axis list location
    const availableSpaceRight = window.innerWidth - button.left;
    const listWidth = list.width;
    const leftCoord = listWidth - availableSpaceRight + margin;

    //y axis list location
    const buttonHeight = button.height;
    const listHeight = list.height;
    const availableSpaceBottom = window.innerHeight - button.bottom - margin;

    if (availableSpaceBottom < listHeight) {
      const availableSpaceTop = button.top - margin;
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

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!listPointer.current) return;
    
    if (!listPointer.current.contains(event.relatedTarget) || event.relatedTarget === null ||
        (event.relatedTarget == buttonPointer.current && dropdownOpen)) {
      setDropdownOpen(false);
    }
  }

  const handleButtonClick = () => {
    (!dropdownOpen && buttonPointer.current) && buttonPointer.current.focus();
    active && setDropdownOpen(x => !x);
  }

  const handleOptionSelection = (option: OptionParams) => {
    if (option.active) {
      setDropdownOpen(false);
      setSelectedItem(option.value);
    } else buttonPointer.current && buttonPointer.current.focus();
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

  const buttonElementClassName = classNames([
    'btn',
    dropdownOpen && ButtonStates.DROPDOWN_OPEN,
    active ? ButtonStates.ENABLED : ButtonStates.DISABLED
  ])

  return (
    <div className={`wrapper ${colorScheme}`}>
      <button
        onBlur={handleBlur}
        onMouseDown={(e) => e.preventDefault()}
        className={buttonElementClassName}
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