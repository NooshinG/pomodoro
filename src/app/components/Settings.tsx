import { useContext, useRef } from "react";
import PomodoroContext from "../context/pomo-context";

const Settings = () => {
  const { pomodoro, changePomodoro } = useContext(PomodoroContext);
  const pomoRef = useRef<HTMLInputElement | null>(null);

  const saveSettingshandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!pomoRef.current) {
      return;
    }

    let newPomodoro: number = pomoRef.current.value
      ? parseInt(pomoRef.current.value)
      : 25;
    changePomodoro(newPomodoro);
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
        <button>
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
        <div className={"time__container"}>
          <label htmlFor="pomodoro" className={'time__label'}>pomodoro</label>
          <input
            type="number"
            min={1}
            max={25}
            defaultValue={pomodoro}
            step={1}
            id="pomodoro"
            ref={pomoRef}            
            className={'time__input'}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default Settings;
