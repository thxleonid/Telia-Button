import classNames from 'classnames'
import { ButtonStates } from '../enum'
import OptionsList from './OptionsList'
import { OptionParams, ButtonProps } from '../types'
import { useState, useRef, FocusEvent, useEffect, useMemo } from 'react'
import { usePopper, Modifier } from 'react-popper'
import { detectOverflow } from '@popperjs/core';

const margin = 10;

const CustomButton: React.FC<ButtonProps> = ({ options, colorScheme, disabled, text, setSelectedItem }) => {
  
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ optionsListStyle, setOptionsListStyle ] = useState({});
  

  const listPointer = useRef<HTMLDivElement>(null);
  const buttonPointer = useRef<HTMLButtonElement>(null);

  const customModifier: Partial<Modifier<string, object>> = useMemo(
    () => ({
        name: 'myModifier',
        enabled: true,
        phase: 'beforeWrite',
        requiresIfExists: ['offset'],
        fn({ state }: any) {
            
            if (buttonEl && dropDownEl) {
                const availableSpaceBottom = window.innerHeight - buttonEl?.getBoundingClientRect().bottom;
                const availableSpaceTop = buttonEl?.getBoundingClientRect().top;
                let height = dropDownEl.getBoundingClientRect().height;

                height -= (availableSpaceTop > availableSpaceBottom) ? availableSpaceTop : availableSpaceBottom;
                console.log(height)
                state.styles.popper.maxHeight = `${height}px`;
            }
            


            // const overflow = detectOverflow(state);
            // console.log(`overflow bottom: ${overflow.bottom}`)
            // console.log(`button bottom: ${buttonEl?.getBoundingClientRect().bottom}`)
            // console.log(dropDownEl)
            // if (overflow.bottom > 0 && dropDownEl) {
            // //const height = dropDownEl.getBoundingClientRect().height - overflow.bottom;
            // //console.log(`height = ${height}`)
            // //state.styles.popper.maxHeight = `${height}px`;
            // }
        },
    }),
    []
  );
  
  const [dropDownEl, setDropDownEl] = useState<HTMLDivElement | null>(null);
  const [buttonEl, setButtonEl] = useState<HTMLButtonElement | null>(null);
  const { styles, attributes, update } = usePopper(buttonEl, dropDownEl, {
    placement: 'bottom-start',
    modifiers: [customModifier]
  });

  

  const showTooltip = () => {
    dropDownEl && dropDownEl.setAttribute('open', 'true');
    setDropdownOpen(true);
    update && update();
  }
 
  const hideTooltip = () => {
    dropDownEl && dropDownEl.removeAttribute('open');
    setDropdownOpen(false);
  }

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
    
    if (!dropDownEl) return;
    
    if (!dropDownEl.contains(event.relatedTarget) || event.relatedTarget === null ||
        (event.relatedTarget == buttonEl && dropdownOpen)) {
      hideTooltip();
    }
  }

  const handleButtonClick = () => {
    (!dropdownOpen && buttonEl) && buttonEl.focus();
    (!disabled && dropdownOpen) ? hideTooltip() : showTooltip();
  }

  const handleOptionSelection = (option: OptionParams) => {
    if (option.active) {
        hideTooltip();
        setSelectedItem(option.value);
    } else buttonEl && buttonEl.focus();
  }

  return (
    <div className={`wrapper ${colorScheme}`}>
        <button
            onBlur={handleBlur}
            onMouseDown={(e) => e.preventDefault()}
            ref={setButtonEl}
            onClick={handleButtonClick}
            disabled={disabled}
            className={classNames([
                'btn',
                dropdownOpen && ButtonStates.DROPDOWN_OPEN,
                disabled ? ButtonStates.DISABLED : ButtonStates.ENABLED
              ])}
        >
        {text}<img src={"./img/arrow.png"} className="btn__icon" alt="Icon of arrow pointing right" /></button>
        <div className="dropdown" style={styles.popper} ref={setDropDownEl} {...attributes.popper}>
            <OptionsList
                options={options}
                handleOptionSelection={handleOptionSelection}
            />
        </div>
    </div>
  );
}

export default CustomButton;