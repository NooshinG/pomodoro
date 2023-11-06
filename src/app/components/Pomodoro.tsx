"use client";

import { useContext, useEffect, useState } from "react";
import PomodoroContext from "../context/pomo-context";
import Settings from "./Settings";

const Pomodoro = () => {
  const { pomodoro } = useContext(PomodoroContext);
  const [initPomodoro, setInitPomodoro] = useState<number>(pomodoro);
  const [pomodoroCounter, setPomodoroCounter] = useState<number>(pomodoro);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  let PomoCounter: NodeJS.Timeout;
  
  if (initPomodoro !== pomodoro) {
    setInitPomodoro(pomodoro);
    setPomodoroCounter(pomodoro);
  }

  const startTimer = (): NodeJS.Timeout => {
    PomoCounter = setTimeout(() => {
      setPomodoroCounter((prev) => prev - 1);
    }, 1000);

    return PomoCounter;
  };

  useEffect(() => {
    pomodoroCounter > 0 && startTimer();
  }, [pomodoroCounter]);

  const showSettingsHandler = (): void => {
    setShowSettings((prev) => !prev);
    clearInterval(PomoCounter);

    if (showSettings && pomodoroCounter > 0) {
      startTimer();
    }

    return;
  };

  return (
    <>
      <div>{pomodoroCounter}</div>
      <p>{`context value : ${pomodoro}`}</p>
      <p>{`init value: ${initPomodoro}`}</p>
      {showSettings && <Settings />}
      <button onClick={showSettingsHandler}>Settings</button>
    </>
  );
};

export default Pomodoro;
