import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [convertion, setConvertion] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState("BRL");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);

  function handleSelectFirst(value) {
    setFirstCurrency(value);
  }
  function handleSelectSecond(value) {
    setSecondCurrency(value);
  }
  function handleAmount(value) {
    setAmount(value);
  }
  useEffect(
    function () {
      async function showConvertion() {
        const result = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
        );
        const data = await result.json();
        const test = data.rates[Object.keys(data.rates)[0]];
        console.log(test);
        setConvertion(test);
      }
      showConvertion();
    },
    [firstCurrency, secondCurrency, amount]
  );
  return (
    <div>
      <input value={amount} onChange={(e) => handleAmount(e.target.value)} />
      <select onChange={(e) => handleSelectFirst(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <select onChange={(e) => handleSelectSecond(e.target.value)}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <p>{convertion}</p>
    </div>
  );
}

export default App;
