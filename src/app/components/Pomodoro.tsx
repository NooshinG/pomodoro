"use client";

import { useContext, useState } from "react";
import PomodoroContext from "../context/pomo-context";
import usePomodoro from "./usePomodoro";
import Settings from "./Settings";

enum TimerMode {
  "pomodor",
  "short",
  "long",
}

const Pomodoro = () => {
  const [timers, setTimers] = useState({
    pomoTimer: true,
    shortTimer: false,
    longTimer: false,
  });

  const { pomodoro, shortBreak, longBreak } = useContext(PomodoroContext);
  let modeTime: number = timers.pomoTimer
    ? pomodoro
    : timers.shortTimer
    ? shortBreak
    : longBreak;

  const { pomodoroCounter, showSettings, showSettingsHandler, clearTimer } =
    usePomodoro(modeTime);

  const changeModeHandler = (item: TimerMode) => {
    clearTimer();
    
    switch (item) {
      case TimerMode.pomodor: {
        setTimers({ pomoTimer: true, shortTimer: false, longTimer: false });
        break;
      }
      case TimerMode.short: {
        setTimers({ pomoTimer: false, shortTimer: true, longTimer: false });
        break;
      }
      case TimerMode.long: {
        setTimers({ pomoTimer: false, shortTimer: false, longTimer: true });
        break;
      }
    }
  };

  return (
    <>
      <ul>
        <li key={1}>
          <button onClick={changeModeHandler.bind(null, TimerMode.pomodor)}>
            pomodoro
          </button>
        </li>
        <li key={2}>
          <button onClick={changeModeHandler.bind(null, TimerMode.short)}>
            short break
          </button>
        </li>
        <li key={3}>
          <button onClick={changeModeHandler.bind(null, TimerMode.long)}>
            long break
          </button>
        </li>
      </ul>
      <div>{pomodoroCounter}</div>
      <p>{`context value : ${pomodoro}`}</p>
      {showSettings && <Settings />}
      <button onClick={showSettingsHandler}>Settings</button>
    </>
  );
};

export default Pomodoro;
