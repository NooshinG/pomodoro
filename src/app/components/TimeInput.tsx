"use client";

import { useState } from "react";

type InputProps = {
  inputTitle: string;
  initialValue: number;
  maxValue: number;
  validationPattern: string;
  validateInput: (isValid: boolean) => void;
  setNewValue: (val: number) => void;
};

const TimeInput = ({
  inputTitle,
  initialValue,
  maxValue,
  validationPattern,
  validateInput,
  setNewValue,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<number>(initialValue);
  const regex = new RegExp(validationPattern);
  let isValid: boolean = regex.test(inputValue.toString());
  
  const changeValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(+e.currentTarget.value);
    validateInput(isValid);

    if (isValid) {
      setNewValue(inputValue);
    }
  };

  const btnNumberHandler = (val: number) => {
    setInputValue((prev) => prev + val);
    validateInput(isValid);

    if (isValid) {
      setNewValue(inputValue);
    }
  };

  return (
    <div className={"time__container"}>
      <h3 className="time__label">{inputTitle}</h3>
      <div className={`time__input ${!isValid ? "error" : ""}`}>
        <input
          type="text"
          className="w-20 bg-transparent outline-none"
          value={inputValue}
          onChange={changeValueHandler}
        />
        <div className={"flex flex-col"}>
          <button onClick={btnNumberHandler.bind(null, 1)}>
            <img className={"arrow"} src="arrow-up.svg" />
          </button>
          <button onClick={btnNumberHandler.bind(null, -1)}>
            <img className={"arrow"} src="arrow-down.svg" />
          </button>
        </div>
      </div>
      <span className={`text-[0.7rem] ${isValid ? "text-transparent" : "text-primary"}`}>
        1-{maxValue} minutes
      </span>
    </div>
  );
};

export default TimeInput;
