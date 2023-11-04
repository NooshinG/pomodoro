"use client";

import { useContext, useEffect, useState, useReducer } from "react";
import PomodoroContext from "../context/pomo-context";
import Settings from "./Settings";

const Pomodoro = () => {
  const { state: ctxState } = useContext(PomodoroContext);
  const [pomoTime, setPomoTime] = useState<number>(ctxState.pomodoro);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  let PomoCounter: NodeJS.Timeout;

  const startTimer = (): NodeJS.Timeout => {
    PomoCounter = setTimeout(() => {
      setPomoTime((prev) => prev - 1);
    }, 1000);

    return PomoCounter;
  };

  useEffect(() => {
    pomoTime > 0 && startTimer();
  }, [pomoTime]);

  const showSettingsHandler = (): void => {
    setShowSettings((prev) => !prev);
    clearInterval(PomoCounter);

    if (showSettings && pomoTime > 0) {
      startTimer();
    }

    return;
  };

  return (
    <>
      <div>{pomoTime}</div>
      {showSettings && <Settings />}
      <button onClick={showSettingsHandler}>Settings</button>
    </>
  );
};

export default Pomodoro;
