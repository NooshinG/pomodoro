"use client";

import React, { createContext, useState, useReducer } from "react";

interface StateType {
  pomodoro: number;
}

type pomoActionType = {
  type: "CHANGE_POMODORO";
  payload: StateType;
};

type ActionType = pomoActionType;

const INITIAL_STATE = {
  pomodoro: 25,
};

const PomodoroContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_POMODORO":
      return {
        ...state,
        pomodoro: action.payload.pomodoro,
      };

    default:
      return state;
  }
};

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <PomodoroContext.Provider value={{ state, dispatch }}>
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroContext;
