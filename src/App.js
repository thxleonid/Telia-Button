import buttonOptions from "./buttonOptions";
import ButtonWrapper from "./components/ButtonWrapper";
import React from "react";

const App = () => {

  const [ colorScheme, setColorScheme ] = React.useState("telia");
  const [ selectedItem, setSelectedItem ] = React.useState("");

  const changeColor = (event) => {
    const scheme = event.target.attributes.getNamedItem('data-value').value;
    setColorScheme(scheme);
  }

  return (
    <div className="App">
      <h1>Telia Arendaja - Prooviülesanne</h1>
      <h2>Select color scheme if needed. Current scheme applied: {colorScheme}</h2>
      <img
        src={"./img/logos/teliaLogo.png"} onClick={changeColor} data-value="telia" tabIndex='0' alt="Telia brand logo"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeColor(e)
          }
        }} />
      <img
        src={"./img/logos/teliaWCAGLogo.png"} onClick={changeColor} data-value="teliaWCAG" tabIndex='0' alt="Telia brand logo with WCAG sticker on it"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeColor(e)
          }
        }} />
      <img
        src={"./img/logos/elisaLogo.png"} onClick={changeColor} data-value="elisa" tabIndex='0' alt="Elisa brand logo"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeColor(e)
          }
        }} />
      <img
        src={"./img/logos/tele2Logo.png"} onClick={changeColor} data-value="tele2" tabIndex='0' alt="Tele2 brand logo"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            changeColor(e)
          }
        }} />

      <h3>Selected list option: {selectedItem}</h3>
      <hr />

      <div className="multipleButtonsBlock-topRow">
        <ButtonWrapper
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
        />

        <ButtonWrapper
          active={false}
          text={"Disabled button"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
        />

        <ButtonWrapper
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
        />
      </div>
      <div className="multipleButtonsBlock-bottomRow">
        <ButtonWrapper
          active={true}
          text={"Erinevad toimingud"}
          options={buttonOptions}
          colorScheme={colorScheme}
          setSelectedItem={setSelectedItem}
        />

        <ButtonWrapper
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

export default App;