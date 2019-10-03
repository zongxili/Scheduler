// return an array of appointments for the given day
import { useState } from "react";
export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const [mode, setMode] = useState(initial);

  function transition(newMode, replace = false) {
    if (replace === true) {
      // console.log("here the new mode is ", newMode);
      setMode(newMode);
    } else {
      const currentHistory = [...history];
      setHistory([...currentHistory, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    // needs to check if its the initial value first
    // if yes, then just return the initial
    const currentHistory = [...history];
    if (currentHistory.length === 1){
      setMode(initial);
      setHistory(initial);
    } else {
      currentHistory.pop();
      setHistory([...currentHistory]);
      setMode(currentHistory[currentHistory.length - 1]);
    }
  }
  return { mode, transition, back };
}