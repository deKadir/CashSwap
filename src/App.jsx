import { useState,useEffect } from "react";



function App() {

    const [amount,setAmount]=useState(1);
    const [from,setFrom]=useState();
    const[to,setTo]=useState();
    const [currencies,setCurrencies]=useState([]);
    const [result,setResult]=useState({});


  const handleConvert=()=>{

    fetch(`https://api.exchangerate.host/latest?BASE=${from}&symbols=${to}&amount=${amount}`).then(async(response)=> await response.json()).then((response)=>{

      if(response.success){
          setResult(response.rates);
      }
    })
  }

  const handleAmountChange=(event)=>{
    setAmount(event.target.value)
  }
  
  const handleFromChange=(event)=>{
    setFrom(event.target.value);
  } 
  const handleToChange=(event)=>{
    setTo(event.target.value);
  } 


  useEffect(()=>{
  fetch('https://api.exchangerate.host/latest').then(async(response)=>await response.json()).then((res)=>{

    const rates=res.rates;
    const ratesArray=Object.keys(rates);
   setCurrencies(ratesArray);
   setTo(ratesArray[0]);
   setFrom(ratesArray[0]);
  
  })

  },[])

  return (
   <div>
    <label htmlFor="amount">Amount</label>
  <input  name="amount" type="number" id="amount" placeholder="Enter currency amount" value={amount} onChange={handleAmountChange} />
  <br />
  <br />
  <label htmlFor="from">From</label>
    <select id="from" onChange={handleFromChange}>
      {
        currencies.map((currency)=>
        <option value={currency} key={currency}>{currency}</option>
        )
      }
    </select>
    <br />
    <br />
  
    <label htmlFor="to">To</label>

    <select  id="to" onChange={handleToChange}>
    {
        currencies.map((currency)=> <option value={currency} key={currency}>{currency}</option>
        )
      }
    </select>
    <br />
  <br />
    <button onClick={handleConvert}>Convert</button>
    <br />
  <br />

  <div>
    {result[to]}
  </div>
   </div>
  )
}

export default App
