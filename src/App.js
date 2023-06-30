import './App.css';
import { useState } from "react";
import Poopy from "./components/Poopy";
import Dad from "./components/Dad";

function App() {
  const [poopy, setPoopy] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        {(poopy === "") ? <>
          <button class="home" onClick={() => {setPoopy(true)}}>I am Poopy</button>
          <button class="home" onClick={() => {setPoopy(false)}}>I am Rick Alan Feese born April 2nd 1975 age 48</button>
        </> : <><button class="back" onClick={() => {setPoopy("")}}>Back</button> {(poopy) ? <Poopy/> : <Dad/>}</>}
      </header>
    </div>
  );
}

export default App;
