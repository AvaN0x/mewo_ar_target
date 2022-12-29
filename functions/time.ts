export const msToHours = (ms: number): number => {
  return Math.floor(ms / 1000 / 60 / 60);
};

export const msToMinutes = (ms: number): number => {
  return Math.floor(ms / 1000 / 60) % 60;
};

export const msToSeconds = (ms: number): number => {
  return Math.floor(ms / 1000) % 60;
};

export const numberToTwoDigit = (value: number): string => {
  return value.toLocaleString('en-US', { minimumIntegerDigits: 2 });
};

export const msToHoursStr = (ms: number): string => {
  return numberToTwoDigit(msToHours(ms));
};

export const msToMinutesStr = (ms: number): string => {
  return numberToTwoDigit(msToMinutes(ms));
};

export const msToSecondsStr = (ms: number): string => {
  return numberToTwoDigit(msToSeconds(ms));
};

export const msToTimeStr = (ms: number): string => {
  let res = `${msToMinutesStr(ms)}:${msToSecondsStr(ms)}`;
  if (msToHours(ms) > 0) {
    res = `${msToHoursStr(ms)}:${res}`;
  }
  return res;
};
