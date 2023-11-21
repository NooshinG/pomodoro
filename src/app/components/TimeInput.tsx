"use client";

import { useState, memo, useEffect, useCallback } from "react";

type InputProps = {
  inputTitle: string;
  initialValue: number;
  maxValue: number;
  validationPattern: string;
  setNewValue: (val: number, isValid: boolean) => void;
};

const TimeInput = ({
  inputTitle,
  initialValue,
  maxValue,
  validationPattern,
  setNewValue,
}: InputProps) => {
  const [inputValue, setInputValue] = useState<number>(initialValue);

  const regex = new RegExp(validationPattern);
  let isValid: boolean = regex.test(inputValue.toString());

  const changeValueHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(+e.currentTarget.value);
  };

  const btnNumberHandler = useCallback(
    (val: number) => {
      setInputValue((prev) => prev + val);
    },
    [inputValue]
  );

  useEffect(() => setNewValue(inputValue, isValid), [inputValue, isValid]);

  // console.log(inputValue, isValid);
  return (
    <div className={"time__container"}>
      <h3 className="time__label">{inputTitle}</h3>
      <div className={`time__input ${!isValid ? "error" : ""}`}>
        <input
          type="text"
          className="w-20 bg-transparent outline-none"
          value={inputValue}
          onChange={changeValueHandler}
          pattern={validationPattern}
        />
        <div className={"flex flex-col"}>
          <button type="button" onClick={btnNumberHandler.bind(null, 1)}>
            <img className={"arrow"} src="arrow-up.svg" />
          </button>
          <button type="button" onClick={btnNumberHandler.bind(null, -1)}>
            <img className={"arrow"} src="arrow-down.svg" />
          </button>
        </div>
      </div>
      <span
        className={`text-[0.7rem] ${
          !isValid ? "text-highlight" : "text-transparent"
        }`}
      >
        1-{maxValue} minutes
      </span>
    </div>
  );
};

export default memo(TimeInput);
