import { IconAlign } from './enum'

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