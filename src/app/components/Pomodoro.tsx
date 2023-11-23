"use client";

import { useContext, useState } from "react";
import PomodoroContext from "../context/pomo-context";
import usePomodoro from "./usePomodoro";
import Settings from "./Settings";
import Timer from "./Timer";

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
    pomodoroCounter,
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

  let percent: number =
    ((pomodoroCounter ? pomodoroCounter : modeTime * 60) * 100) /
    (modeTime * 60);

  let procces: string = ((percent * 722.2) / 100).toString();
  

  return (
    <>
      <h1 className={"text-3xl font-[700]"}>pomodoro</h1>
      <ul
        className={
          "bg-dark py-2 px-2 text-light-gray font-[700] rounded-[50px] flex gap-2"
        }
      >
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
      <div className={"relative md:w-[400px] aspect-square "}>
        <div className={"absolute w-full h-full shadow rounded-[50%]"}></div>
        <Timer
          isStart={isStart}
          procces={procces}
          remainingTime={remainingTime ? remainingTime : `${modeTime}:00`}
          timerControler={timerControler}
        />
      </div>

      {showSettings && <Settings showSettingsHandler={showSettingsHandler} />}
      <button onClick={showSettingsHandler}>
        <img className={"w-8"} src="gear.svg" />
      </button>
    </>
  );
};

export default Pomodoro;
