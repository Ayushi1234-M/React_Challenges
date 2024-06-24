import React, { useEffect, useState } from "react";

export default function Countdown() {
  const [isStart, setIsStart] = useState(false);

  const[hours, setHours] = useState(0);
  const[mins, setMins] = useState(0);
  const[seconds, setSeconds] = useState(0);

  //rendering of divs timers

  function handleStart() {

    if(hours <=0 && mins<=0 &&  seconds<=0)
      {
        alert('Fill all inputs');
      }
      else{
    setIsStart(true);
  }}

  function handleReset()
  {
    setIsStart(false);
    setHours(0); setSeconds(0); setMins(0);
  }

  //handle input of timer

  function handleInput(event)
  {
    console.log(event.target.id, event.target.value);
    const value = parseInt(event.target.value);
    const id = event.target.id;

    if(id === 'hours')
    {
      setHours(value);
    }
    else if(id === 'mins')
    {
      setMins(value);
    }
    else
    {
      setSeconds(value);
    }
  }

  //timer running logic



  const[timerId, setTimerId] = useState();


  function runTimer(sec, min, hr, tid)
  {
    if(sec>0)
    {
        setSeconds((s)=>s-1);
    }
    else if(sec === 0 && min>0)
    {
        setMins((m) => m-1);
        setSeconds(59);
    }
    else
    {
      setHours((h)=>h-1);
      setMins(59);
      setSeconds(59);
    }

    //when timer gets finished:-
    
    if(seconds === 0 && mins===0 & hours===0)
      {
        setHours(0); setSeconds(0); setMins(0);
        clearInterval(tid);
      }

      
  }

  useEffect(()=>{

    if(isStart)
    {
      var tid = setInterval(()=>{
        runTimer(seconds, mins, hours, tid);
      },1000);

      setTimerId(tid);
    }

    return ()=>{clearInterval(tid);}

  },[isStart, hours, mins, seconds])

  //handle pause btn

  const[isPause, setIsPause] = useState(false);

  function pauseClicked()
  {
    setIsPause(true);
    clearInterval(timerId);        
  }


  function resumeClicked()
  {
    setIsPause(false);
    runTimer(seconds, mins, hours);
  }


  return (
    <div>
      <h1>Countdown timer</h1>

      {!isStart && (
        <div className="setup">
          <div className="input-contaner">
            <input id="hours" placeholder="HH" onChange={handleInput}></input>
            <input id="mins" placeholder="MM" onChange={handleInput}></input>
            <input id="seconds" placeholder="SS" onChange={handleInput}></input>
          </div>
          <button onClick={handleStart}>START</button>
        </div>
      )}

      {isStart && (
        <div className="started">
          <div className="modify-btns">
            <span>{hours<10? `0${hours}` : hours}</span> <span>:</span>
            <span>{mins<10? `0${mins}` : mins}</span> <span>:</span>
            <span>{seconds<10? `0${seconds}` : seconds}</span>
          </div>

          {
            !isPause && <button onClick={pauseClicked}>PAUSE</button>
          }

          {
            isPause && <button onClick={resumeClicked}>RESUME</button>
          }

          

          <button onClick={handleReset}>RESET</button>
        </div>
      )}
    </div>
  );
}
