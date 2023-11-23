type PropsType = {
  isStart: boolean;
  timerControler: ()=>void;
  remainingTime: string;
  procces: string;
};

const Timer = ({
  isStart,
  timerControler,
  remainingTime,
  procces,
}: PropsType) => {
  return (
    <svg
      viewBox="-31.25 -31.25 312.5 312.5"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
      className={"w-full h-full "}
    >
      <defs>
        <linearGradient id="grad" x2="1" y1="1">
          <stop offset="0%" stopColor="#1e2140" />
          <stop offset="90%" stopColor="#151932" />
          <stop offset="100%" stopColor="#151932" />
        </linearGradient>
      </defs>
      <circle
        r="155"
        cx="125"
        cy="125"
        fill="url(#grad)"
        stroke-width="0"
        stroke-dasharray="722.2px"
        stroke-dashoffset="0"
      ></circle>
      <circle
        r="135"
        cx="125"
        cy="125"
        fill="#151932"
        stroke="#151932"
        stroke-width="0"
        stroke-dasharray="722.2px"
        stroke-dashoffset="0"
      ></circle>
      <circle
        r="115"
        cx="125"
        cy="125"
        stroke="#f87070"
        stroke-width="10"
        stroke-linecap="round"
        stroke-dashoffset={`${procces}px`}
        fill="transparent"
        stroke-dasharray="722.2px"
      ></circle>
      <text
        x="95px"
        y="145px"
        fill="#d7e0ff"
        font-size="3.5rem"
        font-weight="bold"
        style={{ transform: "rotate(90deg) translate(-18%, -250px)" }}
      >
        {remainingTime}
      </text>
      <text
        x="50%"
        y="50%"
        fill="#d7e0ff"
        font-size="0.9rem"
        font-weight="normal"
        style={{ transform: "rotate(90deg) translate(-22%, -200px)" }}
        letterSpacing="10"
        onClick={timerControler}
        className={"hover:cursor-pointer"}
      >
        {isStart ? "PAUSE" : "START"}
      </text>
    </svg>
  );
};

export default Timer;
