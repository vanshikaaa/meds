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
  const currentDate = `${dateObj.getMonth() + 1}-${dateObj.getDate()}-${dateObj.getFullYear()}`;

  const dates = Array.from(Array(5).keys()).reverse().map((i) => {
    const past = new Date(new Date().setDate(new Date().getDate()-i));
    return `${past.getMonth() + 1}-${past.getDate()}-${past.getFullYear()}`
  });

  // useEffect(() => {
  //   setTimeout(() => {setUpdate(new Date())}, 1000);
  // }, [])

  const updateDisplay = async() => {
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
              <button class="true" onClick={() => {takeMeds("am")}}>Taken AM meds!</button> : 
              <button id="curr" onClick={() => {takeMeds("am")}}>Take AM meds</button>}
      
            {"pm" in data ? 
              <button class="true" onClick={() => {takeMeds("pm")}}>Taken PM meds!</button> : 
              <button id="curr" onClick={() => {takeMeds("pm")}}>Take PM meds</button>}
              <br/>
          </>);
        }
        console.log("not");
        return (<>
          {date}<br/>
          {"am" in data ? 
            <button class="true">Taken AM meds!</button> : 
            <button class="false">Not taken AM meds</button>}
    
          {"pm" in data ? 
            <button class="true">Taken PM meds!</button> : 
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
    const data = {timestamp: dateObj, taken: true};
    console.log(data);
    set(ref(database, '/' + currentDate + "/" + time), data);
    setUpdate(new Date());
  }

  return (
    <div>
      Have I taken my meds? <br/><br/>
      {display}
    </div>
  );
}