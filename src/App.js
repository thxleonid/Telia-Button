import React from "react"
import CustomButton from "./components/Button"
export default function App() {

  const [colorScheme, setColorScheme] = React.useState("telia")
  const [selectedItem, setSelectedItem] = React.useState("")

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
        url: "./img/icon.png",
        alt: "weather icon"
      }
    },
    {
      value: "6th option, with image/icon on right",
      active: true,
      support: false,
      icon: {
        align: "right",
        url: "./img/icon.png",
        alt: "weather icon"
      }
    },
    {
      icon: {
        align: "right",
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
    
  function changeColor(event) {
    
    
    const scheme = event.target.attributes.getNamedItem('data-value').value
    setColorScheme(scheme)
  }
  

  return (
    <div className="App">
        <h2>Select color scheme if needed</h2>
        <img 
          src={"./img/logos/telia logo.png"} onClick={changeColor} data-value="telia" tabIndex={1} alt="Telia brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>
        <img 
          src={"./img/logos/elisa logo.png"} onClick={changeColor} data-value="elisa" tabIndex={1} alt="Elisa brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>
        <img 
          src={"./img/logos/tele2 logo.png"} onClick={changeColor} data-value="tele2" tabIndex={1} alt="Tele2 brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>

        <h2>Current scheme applied: {colorScheme}</h2>
        <h2>Selected option: {selectedItem}</h2>
        <hr></hr>
        
        <div className="multipleButtonsBlock-topRow">
        <CustomButton 
          tabIndex={1}
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />    

        <CustomButton 
          tabIndex={1}
          active={false}
          text={"Disabled button"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />   

        <CustomButton 
          tabIndex={1}
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="multipleButtonsBlock-bottomRow">
        <CustomButton 
          tabIndex={1}
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />    

        <CustomButton 
          tabIndex={1}
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />
        </div>
        
    </div>
  );
}
