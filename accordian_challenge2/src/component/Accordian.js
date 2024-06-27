import React from "react";
import Item from "./Item";

//6.30 min

export default function Accordian() {
  const data = [
    {
      question: "What is a group of cats called?",
      answer: "A group of cats is called a clowder.",
    },
    {
      question: "How many whiskers do cats have on each side of its face?",
      answer: "A cat usually has about 12 whiskers on each side of its face.",
    },
    {
      question: "What is a group of cats called?",
      answer: "A group of cats is called a clowder.",
    },
    {
      question: "How many whiskers do cats have on each side of its face?",
      answer: "A cat usually has about 12 whiskers on each side of its face.",
    },
  ];
  return <div>

<div className="faq">
    {

        data.map((i, index)=>{
         return( 
            
          <Item i={i} index={index}></Item>
          
          )
        })
    }

</div>
  </div>;
}
