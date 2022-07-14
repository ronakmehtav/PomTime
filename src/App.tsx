import { useState } from 'react';
import './App.css';
function startPom(time: number, setTime: Function) {
  const focusTime = getFocusTime(time);
  pomStart(focusTime, setTime);
}

function getFocusTime(mins: number) {
  return new Date(Date.now() + mins * 60 * 1000 + 1000);
}

function pomStart(focusTime: Date, setTime: Function) {
  const interval = setInterval(() => {
    let secLeftIn = Math.floor((focusTime.getTime() - Date.now()) / 1000);
    if (secLeftIn <= 0) clearInterval(interval);
    let minsLeftIn = Math.floor(secLeftIn / 60);
    secLeftIn = secLeftIn % 60;
    // console.log(`${minsLeftIn} mins : ${secLeftIn} secs`);
    const time = new Object({
      minsLeftIn: minsLeftIn,
      secLeftIn: secLeftIn,
    });
    setTime(time);
  }, 1000);
}

function App() {
  const [time, setTime] = useState({ minsLeftIn: 0, secLeftIn: 0 });
  return (
    <div className='app'>
      <p>Hello world!</p>
      <div className='timer'>
        <p>{`${time.minsLeftIn} mins : ${time.secLeftIn} secs`}</p>
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
