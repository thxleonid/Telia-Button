import { ButtonStates, ColorScheme } from '../enum'
import classNames from 'classnames'
import OptionsList from './OptionsList'
import { OptionParams } from '../types'
import { useFloating, offset, flip, size, autoUpdate } from '@floating-ui/react'
import { useState, FocusEvent, Dispatch, SetStateAction } from 'react'

interface IButtonProps {
  options: OptionParams[]; 
  colorScheme: ColorScheme; 
  disabled?: boolean; 
  text: string; 
  setSelectedItem: Dispatch<SetStateAction<string|undefined>>
}

const CustomButton: React.FC<IButtonProps> = (props) => {
  const { options, colorScheme, disabled, text, setSelectedItem } = props;
  const [ dropdownOpen, setDropdownOpen ] = useState(false);

  const { x, y, strategy, refs } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      flip({ padding: 10 }),
      size({
        apply({ elements, availableHeight }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`
          });
        },
        padding: 10
      })
    ]
  });

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!refs.floating.current) return;
    
    if (!refs.floating.current.contains(event.relatedTarget) || event.relatedTarget === null ||
        (event.relatedTarget == refs.reference.current && dropdownOpen)) {
      setDropdownOpen(false);
    }
  }

  const handleButtonClick = () => {
    (!dropdownOpen && refs.reference.current) && (refs.reference.current as HTMLElement).focus(); 
    !disabled && setDropdownOpen(x => !x);
  }

  const handleOptionSelection = (option: OptionParams) => {
    if (option.active) {
      setDropdownOpen(false);
      setSelectedItem(option.value);
    } else refs.reference.current && (refs.reference.current as HTMLElement).focus();
  }

  return (
    <div className={`wrapper ${colorScheme}`}>
      <button
        onBlur={handleBlur}
        onMouseDown={(e) => e.preventDefault()}
        className={classNames([
          'btn',
          dropdownOpen && ButtonStates.DROPDOWN_OPEN,
          disabled ? ButtonStates.DISABLED : ButtonStates.ENABLED
        ])}
        ref={refs.setReference}
        onClick={handleButtonClick}
        disabled={disabled}
      >
      {text}<img src={"./img/arrow.png"} className="btn__icon" alt="Icon of arrow pointing right" /></button>
      {dropdownOpen &&
        <div className="dropdown" ref={refs.setFloating} style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0
        }}>
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