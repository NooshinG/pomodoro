"use client";

import React, { createContext, useState, useReducer } from "react";

const INITIAL_STATE = {
  pomodoro: 25,
  changePomodoro: (value: number): void => {},
};

const PomodoroContext = createContext<typeof INITIAL_STATE>(INITIAL_STATE);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pomodoro, setPomodoro] = useState(25);

  const changePomodoroHandler = (value: number) => {
    setPomodoro(value);
  };

  return (
    <PomodoroContext.Provider
      value={{ pomodoro: pomodoro, changePomodoro: changePomodoroHandler }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContext;
