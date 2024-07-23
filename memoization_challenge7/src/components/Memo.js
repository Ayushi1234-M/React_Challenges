import React, { useMemo, useState } from 'react'

export default function Memo() {

  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  function IncrementOne()
  {
    setCounterOne(counterOne+1);
  }

  function IncrementTwo()
  {
    setCounterTwo(counterTwo+2);
  }

 

  // function isEven()
  // {
  //   //lets add dummy functions - now this delays other operations 
  //   //(even clicking on inc two) because still runs without function being called.
  //   //why it runs? Look at the way this function is called below
  //   //Solution is to use useMemo hook - so other operations are not impacted

  //   let i=0;
  //   while(i<50){console.log(i); i++;}


  //   //the actual need
  //   return counterOne%2===0
  // }


  //use memo - will run only when counterOne is changed
  //now this wont be called when inc two will be called.

  const isEven=useMemo(()=>{

    let i=0;
    while(i<50){console.log(i); i++;}

    return counterOne%2===0

  },[counterOne])


  return (
    <div>

      <button onClick={IncrementOne}>Counter one - {counterOne}</button>
      <span>{isEven?'Even':'Odd'}</span>

      <br></br>
      <button onClick={IncrementTwo}>Counter two - {counterTwo}</button>
      
    </div>
  )
}
