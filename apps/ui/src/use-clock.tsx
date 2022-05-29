import { useState, useEffect } from 'react';

import moment from 'moment-timezone';

function getTime(timezone: string): [string, boolean, number] {
  const mOther = moment(new Date()).tz(timezone);
  const clock = mOther.format("ddd hh:mm A");
  const hour = Number(mOther.format("H"));
  const workingHours = hour >= 9 && hour < 17;

  const mLocal = moment(new Date());
  const diff = ( mOther.utcOffset() - mLocal.utcOffset() ) / 60;

  return [clock, workingHours, diff];
}

export function useClock(timezone: string): [string, boolean, number] {
  const initialTime = getTime(timezone);

  const [clock, setClock] = useState<string>(initialTime[0]);
  const [workingHours, setWorkingHours] = useState<boolean>(initialTime[1]);
  const [diff, setDiff] = useState<number>(initialTime[2]);

  useEffect(() => {
    function updateTime(): void {
      const [clock, workingHours, diff] = getTime(timezone);
      setClock(clock);
      setWorkingHours(workingHours);
      setDiff(diff);
    }

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return [clock, workingHours, diff];
}

export function useLocalClock(): string {
  const getLocalTime = () => moment(new Date()).format("ddd hh:mm:ss A");

  const [clock, setClock] = useState<string>(getLocalTime());

  useEffect(() => {
    function updateTime() {
      const clock = getLocalTime();
      setClock(clock);
    }
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return clock;
}
