import React, { useState, useEffect } from 'react';
import { database } from "../database.js"
import ui from "../style/ui.css"
import { set, ref, get } from 'firebase/database';

export default function Poopy (props) {
  // const [amTaken, setAmTaken] = useState(false);
  // const [pmTaken, setPmTaken] = useState(false);
  const [update, setUpdate] = useState("");
  const [display, setDisplay] = useState();

  const dateObj = new Date();
  dateObj.setHours(dateObj.getHours() - 2);
  const currentDate = `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;

  const dates = Array.from(Array(5).keys()).reverse().map((i) => {
    const past = new Date(new Date().setDate(new Date().getDate()-i));
    return `${past.getMonth() + 1}-${past.getDate()}-${past.getFullYear()}`
  });

  const updateDisplay = async() => {
    console.log(dateObj);
    return Promise.all(dates.map( async (date) => {
      return get(ref(database, '/' + date))
      .then((snap) => {
        let data = snap.val();
        if (data === null) {
          data = {};
        }
        console.log(date);
        console.log(data);
        // console.log(date === currentDate);
        if (date === currentDate) {
          console.log("current");
          return (<>
            {date}<br/>
            {"am" in data ? 
              <button class="true"> Taken AM meds! <br/> <div class="time"> {data.am.timestamp} </div> </button> : 
              <button id="curr" onClick={() => {takeMeds("am")}}>Take AM meds</button>}
      
            {"pm" in data ? 
              <button class="true"> Taken PM meds! <br/> <div class="time"> {data.pm.timestamp} </div> </button> : 
              <button id="curr" onClick={() => {takeMeds("pm")}}>Take PM meds</button>}
              <br/>
          </>);
        }
        console.log("not");
        return (<>
          {date}<br/>
          {"am" in data ? 
            <button class="true">Taken AM meds! <br/> <div class="time"> {data.am.timestamp} </div> </button> : 
            <button class="false">Not taken AM meds</button>}
    
          {"pm" in data ? 
            <button class="true">Taken PM meds! <br/> <div class="time"> {data.pm.timestamp} </div> </button> : 
            <button class="false">Not taken PM meds</button>}
            <br/>
        </>);
      });
    }));
  }

  useEffect(() => {
    updateDisplay().then((a) => setDisplay(a));
  }, [update]);

  const takeMeds = (time) => {
    const data = {timestamp: new Date().toLocaleTimeString("en-US"), taken: true};
    console.log(data);
    set(ref(database, '/' + currentDate + "/" + time), data);
    setUpdate(new Date());
  }

  return (
    <div>
      Have I taken my meds? <br/><br/>
      <script src="https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js"></script>
      {display}
    </div>
  );
}