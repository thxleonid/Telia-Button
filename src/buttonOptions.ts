import { OptionParams } from './types'
import { IconAlign } from './enum'

const buttonOptions: OptionParams[] = [
    {
      value: "First option",
      active: true,
      support: false
    },
    {
      value: "2nd option",
      active: true,
      support: false
    },
    {
      value: "3rd option",
      active: true,
      support: false
    },
    {
      value: "4th option, disabled",
      active: false,
      support: false
    },
    {
      value: "5th option, with image/icon",
      active: true,
      support: false,
      icon: {
        align: IconAlign.LEFT,
        url: "./img/icon.png",
        alt: "weather icon"
      }
    },
    {
      value: "6th option, with image/icon on right",
      active: true,
      support: false,
      icon: {
        align: IconAlign.RIGHT,
        url: "./img/icon.png",
        alt: "weather icon"
      }
    },
    {
      icon: {
        align: IconAlign.RIGHT,
        url: "./img/icon.png",
        alt: "weather icon"
      }
    },
    {
      value: "8th option, Customer support",
      active: true,
      support: true
    },
    {
      value: "9th option, Customer support",
      active: true,
      support: true
    }
  ]

export default buttonOptions;