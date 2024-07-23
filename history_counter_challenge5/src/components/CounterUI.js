import React, { useState } from "react";

export default function CounterUI() {

    const[value, setValue]=useState(0);
    const[history, setHistory] = useState([]);

    function maintainHistory(btn, oldValue, newValue)
    {
      //console.log(btn, oldValue, newValue);
      const obj={
        action: btn, 
        oldval:oldValue, 
        newval:newValue
      }
     
      setHistory([obj, ...history]);
      console.log(history);
    }

    function handleUserAction(btn)
    {
        setValue((s)=>s+btn);

        //to maintain history-
        maintainHistory(btn, value, value+btn);
    }

    //redo
    const[redoList, setRedoList] = useState([]);

    //undo 
     function handleUndo()
    {

      if(history.length >0)
      {
      //  console.log(history[0].action);
       const act = history[0].action;

       //redo 
       const redoFirstItem = history[0];
       setRedoList([redoFirstItem, ...redoList]);

       //undo
       setValue((s)=>s-act); 
       setHistory(p => p.slice(1));      

      }
      else
      {
        alert('No items to undo');
      }

    }

    //redo

    function handleRedo()
    {
      if(redoList.length>0)
      {
        const redoItem = redoList[0];
        const redoOldAction = redoList[0].action;
        

          setValue(s=>s+redoOldAction)
        
       

        setHistory([redoItem, ...history]);

        setRedoList(p => p.slice(1)); 
      }
      else
      {
        //to take from history -------
        const redoFromHistory = history[0];
        const redoHistAct = history[0].action;
        setValue(s=>s+redoHistAct);

        const redoObj = {

          action: redoFromHistory.action, 
          oldval:redoFromHistory.newval, 
          newval:redoFromHistory.newval + redoHistAct

        }

        setHistory([redoObj, ...history]);

      }
      
    }

  return (
    <div>
      <h2>Counter</h2>

      <div className="action-btn">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div className="user-actions">
        {[-1, -10, -100].map((i, index) => {
          return <button key={index} onClick={()=>handleUserAction(i)}>{i}</button>;
        })}

        <div className="currentValue">{value}</div>

        {[+1, +10, +100].map((i, index) => {
          return <button key={index} onClick={()=>handleUserAction(i)}>+{i}</button>;
        })}
      </div>

      <div className="history-title">
        <h3>History</h3>
      </div>
      <div className="history">
    {
    history.map((i, index)=>{
      return <div key={index}>  {i.oldval}{i.action>0? `+${i.action}`: i.action } = {i.newval}</div>
    })
    }
      </div>
    </div>
  );
}
