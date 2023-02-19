import { useCallback, useEffect, useState } from 'react'
import style from "./App.module.scss"

function timeFormat(time: number) {
  const one_hour = 3600 * 100;
  const one_min = 60 * 100;
  const one_sec = 100;
  const hour = Math.floor(time / 360000);
  let hr_str = `${hour}`;
  if (hr_str.length === 1) {
    hr_str = `0${hr_str}`;
  }
  const min = Math.floor((time - hour * one_hour) / one_min);
  let min_str = `${min}`;
  if (min_str.length === 1) {
    min_str = `0${min_str}`;
  }
  const sec = Math.floor((time - hour * one_hour - min * one_min) / one_sec);
  let sec_str = `${sec}`
  if (sec_str.length === 1) {
    sec_str = `0${sec_str}`
  }
  const msec = Math.floor(time - hour * one_hour - min * one_min - sec * one_sec);
  let msec_str = `${msec}`
  if (msec_str.length === 1) {
    msec_str = `00${msec_str}`;
  } else if (msec_str.length === 2) {
    msec_str = `0${msec_str}`;
  }
  return `${hr_str}:${min_str}:${sec_str}:${msec_str}`;
}

interface LapItem {
  lapId: number,
  time: number,
};

function App() {
  const [count, setCount] = useState(0);
  const [ isStopped, setIsStopped] = useState(false);
  const [ counter, setCounter ] = useState(0);
  const [ laps, setLaps ] = useState<LapItem[]>([]);


  const addLap = useCallback(() => {
    const lapItem: LapItem = {
      lapId: counter,
      time: count
    };
    setLaps(lap => lap.concat(lapItem));
 }, [count, counter, setLaps]);

 const resetLaps = useCallback(() => {
  setLaps(_ => [])
 }, [setLaps]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStopped) {
        setCount(prev => prev + 1);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [isStopped]);

  return (
    <div className="App">
      <div className={style.timer}>
        {timeFormat(count)}
      </div>
      <div
      >
        {laps.map(lap => (<div key={lap.lapId}>{timeFormat(lap.time)}</div>))}
      </div>
      <div>
      <button
        className={style.button}
        onClick={() => setIsStopped(prev => !prev)}
      >
        Start/Stop
      </button>
      <button
        className={style.button}
        onClick={() => setCount(_ => 0)}
      >
        Reset
      </button>
      <button
        className={style.button}
        onClick={() => addLap()}
      >
        Lap
      </button>
      <button
        className={style.button}
        onClick={resetLaps}
      >
        Reset Laps
      </button>
      </div>
    </div>
  )
}

export default App
