import { useState } from 'react';
import './App.css';
function startPom(time: number, setTime: Function, setTimerState: Function) {
  const focusTime = getFocusTime(time);
  setTimerState(true); //locking the timer
  pomStart(focusTime, setTime, setTimerState);
}

function getFocusTime(mins: number) {
  return new Date(Date.now() + mins * 60 * 1000 + 2000); // addition 2sec is offset the setInterval time.
}

function pomStart(
  focusTime: Date,
  setTime: Function,
  setTimerState: Function
) {
  const interval = setInterval(() => {
    let timeLeftIn = Math.floor((focusTime.getTime() - Date.now()) / 1000);
    if (timeLeftIn <= 0) {
      setTimerState(false); //allowing new timer to be initiated.
      clearInterval(interval);
    }
    let minsLeftIn = Math.floor(timeLeftIn / 60);
    let secLeftIn = timeLeftIn % 60;
    // console.log(`${minsLeftIn} mins : ${secLeftIn} secs`);
    const time: time = {
      minsLeftIn,
      secLeftIn,
    };
    setTime(time);
  }, 1000);
}

type time = {
  minsLeftIn: number;
  secLeftIn: number;
};

function App() {
  const [isTimerActive, setTimerState] = useState(false);
  const [{ minsLeftIn, secLeftIn }, setTime] = useState({
    minsLeftIn: 0,
    secLeftIn: 0,
  } as time);
  return (
    <div className='app'>
      <div className='timer'>
        <p>{`${minsLeftIn} mins : ${secLeftIn} secs`}</p>
      </div>
      <button
        disabled={isTimerActive ? true : false}
        onClick={() => {
          if (!isTimerActive) {
            startPom(0.1, setTime, setTimerState);
          }
        }}
      >
        StartPomTime
      </button>
    </div>
  );
}

export default App;
