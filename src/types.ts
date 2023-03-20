import { IconAlign, ColorScheme } from './enum'
import { Dispatch, SetStateAction } from 'react'

export type OptionParams = {
    value?: string;
    active?: boolean;
    support?: boolean;
    icon?: {
        align: IconAlign,
        url: string,
        alt: string
    }
  }

  export type ButtonProps = {
    options: OptionParams[]; 
    colorScheme: ColorScheme; 
    disabled?: boolean; 
    text: string; 
    setSelectedItem: Dispatch<SetStateAction<string|undefined>>
  }
  