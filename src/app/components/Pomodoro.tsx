"use client";

import { useContext, useEffect, useState } from "react";
import PomodoroContext from "../context/pomo-context";

const Pomodoro = () => {
  const { state } = useContext(PomodoroContext);
  const [time, setTimer] = useState(state.pomodoro);

  useEffect(() => {
    time > 0 &&
      setTimeout(() => {
        setTimer((t) => t - 1);
      }, 1000);
  }, [time]);

  return <div>{time}</div>;
};

export default Pomodoro;
