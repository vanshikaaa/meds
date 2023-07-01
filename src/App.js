import './App.css';
import { useState } from "react";
import Poopy from "./components/Poopy";
import Dad from "./components/Dad";
import addNotification from 'react-push-notification';

function App() {
  const [poopy, setPoopy] = useState("");

  const notification = () => {
    setTimeout( () => {
      addNotification({
        title: 'Meds',
        subtitle: 'Meds?',
        message: 'tell ur mom i said hi!!!!!!!!!!!',
        theme: 'darkblue',
        native: true
      });
    }, 10000);
  }

  return (
    <div className="App">
      <header className="App-header">
        {(poopy === "") ? <>
          <button class="home" onClick={() => {setPoopy(true)}}>I am Poopy</button>
          <button class="home" onClick={() => {setPoopy(false)}}>I am Rick Alan Feese born April 2nd 1975 age 48</button>
        </> : <><button class="back" onClick={() => {setPoopy("")}}>Back</button> {(poopy) ? <Poopy/> : <Dad/>}</>}
        <button onClick={() => {notification()}}>Testing???</button>
      </header>
    </div>
  );
}

export default App;
