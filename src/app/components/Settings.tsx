import { useContext, useState, useCallback } from "react";
import PomodoroContext from "../context/pomo-context";
import TimeInput from "./TimeInput";

type PropsType = {
  showSettingsHandler: () => void;
};

type Minutes = {
  pomodoro: { val: number; isValid: boolean };
  shortBreak: { val: number; isValid: boolean };
  longBreak: { val: number; isValid: boolean };
};

const Settings = ({ showSettingsHandler }: PropsType) => {
  const {
    pomodoro,
    changePomodoro,
    shortBreak,
    changeShortBreak,
    longBreak,
    changeLongBreak,
  } = useContext(PomodoroContext);

  const [minutes, setMinutes] = useState<Minutes>({
    pomodoro: { val: pomodoro, isValid: true },
    shortBreak: { val: shortBreak, isValid: true },
    longBreak: { val: longBreak, isValid: true },
  });

  // console.log({ ...minutes });

  // const isEnable: boolean =
  //   minutes.pomodoro.isValid &&
  //   minutes.shortBreak.isValid &&
  //   minutes.longBreak.isValid;

  const saveSettingshandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      minutes.pomodoro.isValid &&
      minutes.shortBreak.isValid &&
      minutes.longBreak.isValid
    ) {
      changePomodoro(minutes.pomodoro.val);
      changeShortBreak(minutes.shortBreak.val);
      changeLongBreak(minutes.longBreak.val);
      showSettingsHandler();
    }

    return;
  };

  const setNewPomodoro = useCallback(
    (val: number, isValid: boolean) => {
      setMinutes((prev) => {
        return { ...prev, pomodoro: { val: val, isValid: isValid } };
      });
    },
    [minutes.pomodoro.val, minutes.pomodoro.isValid]
  );

  const setNewShortBreak = useCallback(
    (val: number, isValid: boolean) => {
      setMinutes((prev) => {
        return { ...prev, shortBreak: { val: val, isValid: isValid } };
      });
    },
    [minutes.shortBreak.val, minutes.shortBreak.isValid]
  );

  const setNewLongBreak = useCallback(
    (val: number, isValid: boolean) => {
      setMinutes((prev) => {
        return { ...prev, longBreak: { val: val, isValid: isValid } };
      });
    },
    [minutes.longBreak.val, minutes.longBreak.isValid]
  );

  return (
    <div
      className={
        "absolute flex flex-col justify-center items-center w-full h-full bg-dark/[0.6] text-primary"
      }
    >
      <div
        className={
          "flex justify-between items-center w-[80vw] md:w-[55vw] py-5 pr-6 pl-10 rounded-t-2xl bg-white border-b-light-gray border-b-[1px]"
        }
      >
        <h2 className={"text-2xl font-[500]"}>Settings</h2>
        <button onClick={showSettingsHandler}>
          <img src="close.svg" className={"w-8"} />
        </button>
      </div>
      <form
        className={
          "relative w-[80vw] md:w-[55vw] pt-4 pb-8 pr-6 pl-10 rounded-b-2xl bg-white"
        }
      >
        <h2 className={"tracking-[0.3rem] font-[700] text-left"}>
          TIME (MINUTES)
        </h2>
        <div className={"flex justify-between"}>
          <TimeInput
            inputTitle="pomodoro"
            initialValue={minutes.pomodoro.val}
            maxValue={25}
            validationPattern="^(2[0-5]|1[0-9]|[1-9])$"
            setNewValue={setNewPomodoro}
          />
          <TimeInput
            inputTitle="short break"
            initialValue={minutes.shortBreak.val}
            maxValue={5}
            validationPattern="^([1-5])$"
            setNewValue={setNewShortBreak}
          />
          <TimeInput
            inputTitle="long break"
            initialValue={minutes.longBreak.val}
            maxValue={15}
            validationPattern="^([1-9]|1[0-5])$"
            setNewValue={setNewLongBreak}
          />
        </div>
        <button
          onClick={saveSettingshandler}
          className={
            "w-fit absolute bottom-[-20px] left-0 right-0 m-auto bg-highlight text-light font-[500] py-2 px-10 rounded-[50px] disabled:bg-dark-gray"
          }
          disabled={
            !(
              minutes.pomodoro.isValid &&
              minutes.shortBreak.isValid &&
              minutes.longBreak.isValid
            )
          }
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default Settings;
