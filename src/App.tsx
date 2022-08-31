import { useState } from 'react';
import './App.css';
function startPom(time: time, setTime: Function, setTimerState: Function) {
    const focusTime = getFocusTime(time);
    setTimerState(true); //locking the timer
    pomStart(focusTime, setTime, setTimerState);
}

function getFocusTime(time: time) {
    return new Date(Date.now() + time.mins * 60 * 1000 + time.secs * 1000 + 2000); // addition 2sec is offset the setInterval time.
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
        let mins = Math.floor(timeLeftIn / 60);
        let secs = timeLeftIn % 60;
        // console.log(`${minsLeftIn} mins : ${secLeftIn} secs`);
        const time: time = {
            mins,
            secs,
        };
        setTime(time);
    }, 1000);
}

type time = {
    mins: number;
    secs: number;
};

function App() {
    const [isTimerActive, setTimerState] = useState(false);
    const [defaultTime, setDefaultTime] = useState({
        mins: 0,
        secs: 6,
    } as time);
    return (
        <div className='app'>
            <div>
                <input type="number" title='default time mins' 
                    onChange={(e) => {
                        e.target.value !== '' && e.target.checkValidity() &&
                            setDefaultTime(
                            { 
                                mins: Number.parseInt(e.target.value),
                                secs: defaultTime.secs,
                            })
                        }
                    }
                defaultValue={defaultTime.mins} min={0} />
                :
                <input type="number" defaultValue={defaultTime.secs}
                    required
                    onChange={(e) => {
                        e.target.value !== '' && e.target.checkValidity() &&
                            setDefaultTime(
                            { 
                                mins: defaultTime.mins, 
                                secs: Number.parseInt(e.target.value) 
                            })
                        }
                    }
                    title='default time secs' min={0} max={60} />
            </div>
            <div className='timer'>
                <p>{`${defaultTime.mins} mins : ${defaultTime.secs} secs`}</p>
            </div>
            <button
                disabled={isTimerActive ? true : false}
                onClick={() => {
                    if (!isTimerActive) {
                        startPom(defaultTime, setDefaultTime, setTimerState);
                    }
                }}
            >
                StartPomTime
            </button>
        </div>
    );
}

export default App;
