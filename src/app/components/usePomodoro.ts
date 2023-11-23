"use client";

import { useState, useEffect } from "react";
import convertToMinSec from "./convertToMinSec";

const usePomodoro = (pomodoro: number) => {
  const [initPomodoro, setInitPomodoro] = useState<number>(pomodoro);
  const [pomodoroCounter, setPomodoroCounter] = useState<number>(pomodoro);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>("");
  const [isStart, setIsStart] = useState<boolean>(false);
  let PomoCounter: NodeJS.Timeout;

  if (initPomodoro !== pomodoro) {
    setInitPomodoro(pomodoro);
    setPomodoroCounter(pomodoro);
  }

  const startTimer = (): NodeJS.Timeout => {
    PomoCounter = setTimeout(() => {
      setRemainingTime(convertToMinSec(pomodoroCounter));
      setPomodoroCounter((prev) => prev - 1);
    }, 1000);

    return PomoCounter;
  };

  useEffect(() => {
    if (isStart) {
      pomodoroCounter > 0 && startTimer();
    }
  }, [pomodoroCounter, isStart]);

  const showSettingsHandler = (): void => {
    if (!showSettings) {
      clearInterval(PomoCounter);
      setIsStart(false);
    }

    setShowSettings((prev) => !prev);
    return;
  };

  const clearTimer = (): void => {
    clearInterval(PomoCounter);
  };

  const timerControler = () => {
    setIsStart((prev) => !prev);
  };

  const resetTimer = () => {
    clearInterval(PomoCounter);
    setPomodoroCounter(initPomodoro);
    setRemainingTime(convertToMinSec(initPomodoro));
  };

  return {
    remainingTime,
    showSettings,
    isStart,
    pomodoroCounter,
    showSettingsHandler,
    clearTimer,
    timerControler,
    resetTimer,
  };
};

export default usePomodoro;
