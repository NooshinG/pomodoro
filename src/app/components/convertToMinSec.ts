const convertToMinSec = (seconds: number): string => {
  let numberParts: string[] = (seconds / 60).toString().split(".");
  let remainingSeconds: string =
    numberParts.length <= 1
      ? "00"
      : (
          (parseInt(
            (numberParts[1].length === 1
              ? numberParts[1] + "0"
              : numberParts[1]
            ).slice(0, 2)
          ) /
            100) *
          60
        )
          .toFixed(0)
          .toString();

  let min: string =
    +numberParts[0] < 10 && +numberParts[0] > 0
      ? "0" + numberParts[0]
      : numberParts[0];

  let sec: string =
    +remainingSeconds < 10 && +remainingSeconds > 0
      ? "0" + remainingSeconds
      : remainingSeconds;

  return `${min} : ${sec}`;
};

export default convertToMinSec;
