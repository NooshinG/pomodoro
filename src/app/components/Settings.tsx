import { useContext, useState } from "react";
import PomodoroContext from "../context/pomo-context";
import TimeInput from "./TimeInput";

type PropsType = {
  showSettingsHandler: () => void;
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

  const [isValidInput, setIsValidInput] = useState({
    isValidPomodoro: true,
    isValidShortBreak: true,
    isValidLongBreak: true,
  });

  // const [newTimeValues, setNewTimeValues] = useState({
  //   newPomodoro: 25,
  //   newShortBreak: 5,
  //   newLongBreak: 15,
  // });

  let newPomodoro: number = pomodoro;
  let newShortBreak: number = shortBreak;
  let newLongBreak: number = longBreak;

  // let isPomodoroValid: boolean = true;
  // let isShortBreakValid: boolean = true;
  // let isLongBreakValid: boolean = true;

  const saveSettingshandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log(
      isValidInput.isValidPomodoro &&
        isValidInput.isValidShortBreak &&
        isValidInput.isValidLongBreak,
      newShortBreak
    );

    if (
      isValidInput.isValidPomodoro &&
      isValidInput.isValidShortBreak &&
      isValidInput.isValidLongBreak
      // !isPomodoroValid ||
      // !isShortBreakValid ||
      // !isLongBreakValid
    ) {
      changePomodoro(newPomodoro);
      changeShortBreak(newShortBreak);
      changeLongBreak(newLongBreak);
      showSettingsHandler();
    }

    // changePomodoro(newTimeValues.newPomodoro);
    // changeShortBreak(newTimeValues.newShortBreak);
    // changeLongBreak(newTimeValues.newLongBreak);
    return;
  };

  const isValidPomodoro = (isValid: boolean) => {
    setIsValidInput({ ...isValidInput, isValidPomodoro: isValid });
    // isPomodoroValid = isValid;
  };
  const isValidShortBreak = (isValid: boolean) => {
    setIsValidInput({ ...isValidInput, isValidShortBreak: isValid });
    // isShortBreakValid = isValid;
  };
  const isValidLongBreak = (isValid: boolean) => {
    setIsValidInput({ ...isValidInput, isValidLongBreak: isValid });
    // isLongBreakValid = isValid;
  };

  const setNewPomodoro = (val: number) => {
    // setNewTimeValues({ ...newTimeValues, newPomodoro: val });
    newPomodoro = val;
  };
  const setNewShortBreak = (val: number) => {
    // setNewTimeValues({ ...newTimeValues, newShortBreak: val });
    newShortBreak = val;
  };
  const setNewLongBreak = (val: number) => {
    // setNewTimeValues({ ...newTimeValues, newLongBreak: val });
    newLongBreak = val;
  };

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
        onSubmit={saveSettingshandler}
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
            initialValue={pomodoro}
            maxValue={25}
            validationPattern="^(2[0-5]|1[0-9]|[1-9])$"
            validateInput={isValidPomodoro}
            setNewValue={setNewPomodoro}
          />
          <TimeInput
            inputTitle="short break"
            initialValue={shortBreak}
            maxValue={5}
            validationPattern="^([1-5])$"
            validateInput={isValidShortBreak}
            setNewValue={setNewShortBreak}
          />
          <TimeInput
            inputTitle="long break"
            initialValue={longBreak}
            maxValue={15}
            validationPattern="^([1-9]|1[0-5])$"
            validateInput={isValidLongBreak}
            setNewValue={setNewLongBreak}
          />
        </div>
        <button
          className={
            "w-fit absolute bottom-[-20px] left-0 right-0 m-auto bg-highlight text-light font-[500] py-2 px-10 rounded-[50px] disabled:bg-dark-gray"
          }
          disabled={
            !(
              (
                isValidInput.isValidPomodoro &&
                isValidInput.isValidShortBreak &&
                isValidInput.isValidLongBreak
              )
              // (isPomodoroValid && isShortBreakValid && isLongBreakValid)
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
