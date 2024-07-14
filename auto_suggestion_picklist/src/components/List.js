import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export default function List() {
  const [foodItem, setFootItem] = useState("");

  function handleInput(e) {
    const food = e.target.value;
    setFootItem(food);
  }

  //api call to fetch items

  const [shoppingList, setShoppingList] = useState([]);

  async function fetchItems(food) {
    const url = `https://api.frontendeval.com/fake/food/${food}`;

    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    setShoppingList(data);
  }

  //use effect to run whenever item is entered in the input box
  useEffect(() => {
    if (foodItem.length >= 2) {
      fetchItems(foodItem);
    } else if (foodItem.length < 2) {
      setShoppingList([]);
    }
  }, [foodItem]);

  //handling selecting food item

  const[bucketList, setBucketList] = useState([]);

  function handleSelectedListItem(e)
  {

   var idx = e.target.getAttribute("data-id");
   if(idx)
   {
    var obj = {
      id: Date.now(),
      data:shoppingList[idx],
      isDone: false 
    }

    setBucketList([...bucketList, obj]);
    console.log(bucketList);
   }
  }

  function deleteFromBucketList(fetchId)
  {
    var newDeletedLIst = bucketList.filter((i)=>
      i.id !== fetchId
    );

    setBucketList(newDeletedLIst);
  }

  function checkFromBucketList(fetchId)
  {
   var newbktList =  bucketList.map((i)=>{
      if(i.id === fetchId)
      {
        i.isDone = !i.isDone;
      }
     return i;
    });

    setBucketList(newbktList);

  }

  return (
    <div>
      <div className="input">
        <input
          className="searchItem"
          type="text"
          value={foodItem}
          onChange={handleInput}
          placeholder="Search item...."
        ></input>
      </div>

      <div className="allList">
        {shoppingList.length < 2 ? (
          <div className="">Search an item.</div>
        ) : (
          <div className="shopping-list" onClick={handleSelectedListItem}>
            {shoppingList.map((i, index) => {
              return <div key={index} data-id={index} className="printedItems">{i}</div>;
            })}
          </div>
        )}
      </div> 

      <div className="selectedList">
        {
          bucketList.map((i, index)=>{
            return <div className="bktItem">
            <FaRegCircleCheck className="check" onClick={()=>checkFromBucketList(i.id)} />
             <span 
             className={i.isDone? "dataItemStrike" : "data" }
             >
              {i.data}</span>
              <RxCross2 className="cross" onClick={()=>deleteFromBucketList(i.id)} />
              </div>
          })
        }
      </div>
    </div>
  );
}
