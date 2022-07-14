import { useState } from 'react';
import './App.css';
function startPom(time: number, setTime: Function) {
  const focusTime = getFocusTime(time);
  pomStart(focusTime, setTime);
}

function getFocusTime(mins: number) {
  return new Date(Date.now() + mins * 60 * 1000 + 2000); // addition 2sec is offset the setInterval time.
}

function pomStart(focusTime: Date, setTime: Function) {
  const interval = setInterval(() => {
    let timeLeftIn = Math.floor((focusTime.getTime() - Date.now()) / 1000);
    if (timeLeftIn <= 0) clearInterval(interval);
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
  const [{ minsLeftIn, secLeftIn }, setTime] = useState({
    minsLeftIn: 0,
    secLeftIn: 0,
  } as time);
  return (
    <div className='app'>
      <p>Hello world!</p>
      <div className='timer'>
        <p>{`${minsLeftIn} mins : ${secLeftIn} secs`}</p>
      </div>
      <button
        onClick={() => {
          startPom(0.1, setTime);
        }}
      >
        StartPomTime
      </button>
    </div>
  );
}

export default App;
