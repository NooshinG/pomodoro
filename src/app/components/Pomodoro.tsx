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

  const {
    remainingTime,
    showSettings,
    isStart,
    showSettingsHandler,
    clearTimer,
    timerControler,
    // resetTimer,
  } = usePomodoro(modeTime * 60);

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
    <h1 className={"text-3xl font-[700]"}>pomodoro</h1>
      <ul className={'bg-dark py-2 px-2 text-light-gray font-[700] rounded-[50px] flex gap-2'}>
        <li key={1} data-active={timers.pomoTimer} className="option">
          <button onClick={changeModeHandler.bind(null, TimerMode.pomodor)}>
            pomodoro
          </button>
        </li>
        <li key={2} data-active={timers.shortTimer} className="option">
          <button onClick={changeModeHandler.bind(null, TimerMode.short)}>
            short break
          </button>
        </li>
        <li key={3} data-active={timers.longTimer} className="option">
          <button onClick={changeModeHandler.bind(null, TimerMode.long)}>
            long break
          </button>
        </li>
      </ul>
      <div>
        <p>{remainingTime ? remainingTime : `${modeTime} : 00`}</p>
        <button onClick={timerControler}>{isStart ? "Pause" : "Start"}</button>
      </div>
      {/* <button onClick={resetTimer}>Reset</button> */}
      {showSettings && <Settings showSettingsHandler={showSettingsHandler} />}
      <button onClick={showSettingsHandler}><img className={'w-8'} src="gear.svg"/></button>
    </>
  );
};

export default Pomodoro;
