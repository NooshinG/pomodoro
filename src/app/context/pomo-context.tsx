"use client";

import React, { createContext, useState } from "react";

const INITIAL_STATE = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
  changePomodoro: (value: number): void => {},
  changeShortBreak: (value: number): void => {},
  changeLongBreak: (value: number): void => {},
};

const PomodoroContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(10);

  const changePomodoroHandler = (value: number) => {
    setPomodoro(value);
  };

  const chaneShortBreakHandler = (value: number) => {
    setShortBreak(value);
  };

  const chaneLongBreakHandler = (value: number) => {
    setLongBreak(value);
  };

  return (
    <PomodoroContext.Provider
      value={{
        pomodoro: pomodoro,
        changePomodoro: changePomodoroHandler,
        shortBreak: shortBreak,
        changeShortBreak: chaneShortBreakHandler,
        longBreak: longBreak,
        changeLongBreak: chaneLongBreakHandler,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContext;
