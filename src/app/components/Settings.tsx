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
    <div>
      <form onSubmit={saveSettingshandler}>
        <input
          type="number"
          min={1}
          max={25}
          defaultValue={pomodoro}
          step={1}
          id="pomodor"
          ref={pomoRef}
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default Settings;
