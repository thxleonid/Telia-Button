import React from "react"
import CustomButton from "./components/Button"
import teliaLogo from "./img/logos/telia logo.png"
export default function App() {

  const [colorScheme, setColorScheme] = React.useState("telia")
  
  const buttonOptions = [
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
        align: "left",
        url: "./img/icon.png"
      }
    },
    {
      value: "6th option, with image/icon on right",
      active: true,
      support: false,
      icon: {
        align: "right",
        url: "./img/icon.png"
      }
    },
    {
      value: "7th option, Customer support",
      active: true,
      support: true
    },
    {
      value: "8th option, Customer support",
      active: true,
      support: true
    }
  ]
    
  function changeColor(event) {
    setColorScheme(event.target.value)
    console.log(event)
  }
  

  return (
    <div className="App">
        <h2>Select color scheme if needed</h2>
        <button onClick={changeColor} value="telia">Telia</button>
        <img value="telia" src={teliaLogo} onClick={changeColor} />
        <button onClick={changeColor} value="elisa">Elisa</button>
        <button onClick={changeColor} value="tele2">Tele2</button>

        <h2>Current scheme applied: {colorScheme}</h2>


        <CustomButton 
          tabIndex={1}
          active={true}
          text={"Enabled button"}
          options={buttonOptions}
          colorScheme={colorScheme}
          />

        <CustomButton 
          tabIndex={0}
          active={false}
          text={"Disabled button"}
          options={buttonOptions}
          colorScheme={colorScheme}
          />
    </div>
  );
}
