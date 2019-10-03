// return an array of appointments for the given day
import {useState} from "react";
export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  const [mode, setMode] = useState(initial);

  function transition(newMode){
    setMode(newMode);
    setHistory(newMode);
    console.log("HERERERERERE");
    console.log(newMode);
    console.log("history", history);
  }

  function back(){
    // needs to check if its the initial value first
    // if yes, then just return the initial
    console.log(history);
    setMode(history);
  }

  return { mode, transition, back };
}