import { useEffect, useState } from 'react'
import React from 'react'
import InputTimer from './InputTimer';
import './App.css'

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setisPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);


  const handleStart = () => {
    if (hours < 0 || minutes < 0 || seconds < 0) {

      alert("Invalid input............")
    }else if (hours == 0 && minutes == 0 && seconds == 0) {

      alert("Invalid input............")
    } else {
      setIsStart(true);
    }

  }

  const handlePause = () => {
    setisPaused(true);
    clearInterval(timerId);

  }
  const handleResume = () => {

    setisPaused(false);
    runTimer(seconds, minutes, hours);

  }
  const handleReset = () => {

    setIsStart(false);
    resetTime();
    clearInterval(timerId);
  }
  const handleInput = (e) => {

    const value = parseInt(e.target.value);
    const id = e.target.id;

    if (id === 'hours') {
      setHours(value);
    }
    else if (id === 'minutes') {
      setMinutes(value);
    }
    else {
      setSeconds(value);
    }
  }
  const resetTime = () =>{
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }
  const runTimer = (sec, min, hr, tid) => {

    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    }
    else if (min === 0) {
      setHours((h) => h - 1)
      setMinutes(59);
      setSeconds(59);

    }
    if (hr === 0 && min === 0 && sec === 0) {
      resetTime();
      clearInterval(tid);
      alert("COUNDOWN END.......")
    }

  }


  useEffect(() => {

    let tid;

    if (isStart) {
      tid = setInterval(() => {

        runTimer(seconds, minutes, hours, tid);

      }, 1000);
      setTimerId(tid);
    }

    return () => {
      clearInterval(tid);
    }

  }, [isStart, hours, minutes, seconds])

  return (
 <div className='App-container'>
    <div className='App'>
      <h1>Coundown Timer</h1>

      {
        !isStart && (<InputTimer handleInput = {handleInput} handleStart ={handleStart}/>)
      }

      {
        isStart && (<div className='show-container'>
          <div className='timer-box'>
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <div className='action-box'>
            {

              !isPaused && <button onClick={handlePause} className='timer-button'> Pause</button>
            }
            {

              isPaused && <button onClick={handleResume} className='timer-button'> Resume</button>
            }
            <button
              onClick={handleReset}
              className='timer-button'>Restart</button>
          </div>
        </div>)
      }
    </div>
  </div>
  )
}

export default App

