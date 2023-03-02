import React from "react"
import CustomButton from "./components/Button"
import buttonOptions from "./buttonOptions"
export default function App() {

  const [colorScheme, setColorScheme] = React.useState("telia")
  const [selectedItem, setSelectedItem] = React.useState("")

  function changeColor(event) {
    const scheme = event.target.attributes.getNamedItem('data-value').value
    setColorScheme(scheme)
  }
  

  return (
    <div className="App">
        <h2>Select color scheme if needed</h2>
        <img 
          src={"./img/logos/teliaLogo.png"} onClick={changeColor} data-value="telia" tabIndex={1} alt="Telia brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>
        <img 
          src={"./img/logos/elisaLogo.png"} onClick={changeColor} data-value="elisa" tabIndex={1} alt="Elisa brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>
        <img 
          src={"./img/logos/tele2Logo.png"} onClick={changeColor} data-value="tele2" tabIndex={1} alt="Tele2 brand logo"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              changeColor(e)
            }
          }}/>

        <h2>Current scheme applied: {colorScheme}</h2>
        <h2>Selected option: {selectedItem}</h2>
        <hr />
        
        <div className="multipleButtonsBlock-topRow">
        <CustomButton 
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />    

        <CustomButton 
          active={false}
          text={"Disabled button"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />   

        <CustomButton 
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />
        </div>
        <div className="multipleButtonsBlock-bottomRow">
        <CustomButton 
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
          />    

        <CustomButton 
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
