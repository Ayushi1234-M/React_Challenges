import React, { useEffect, useState } from 'react'

export default function Item({i, index}) {

  const[show, setShow] = useState(false);

  useEffect(()=>{

    if(index === 0)
      {
        setShow(true);
      }

  },[])

  function handleClick()
  {
    setShow((s)=>!s);
  }

  return (
    <div>

        <div className='acc-box'>
            <div className='question' onClick={handleClick}>
                <div className={show? 'open' : ''}>▶ </div>
                
                <div className='item'>{i.question}</div>
            </div>

            <div className='answer'>
            {show && <div className='item'>{i.answer}</div>}
            </div>
        </div>
      
    </div>
  )
}
