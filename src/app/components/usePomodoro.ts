"use client";

import { useState, useEffect } from "react";

const usePomodoro = (pomodoro: number) => {
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

  const clearTimer = (): void => {
    clearInterval(PomoCounter);
  };

  return { pomodoroCounter, showSettings, showSettingsHandler, clearTimer };
};

export default usePomodoro;
