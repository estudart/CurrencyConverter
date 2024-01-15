import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [conversion, setConversion] = useState(0);
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
      async function showConversion() {
        const result = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`
        );
        const data = await result.json();
        const test = Object.values(data.rates)[0];
        console.log(test);
        setConversion(test);
      }

      if (firstCurrency !== secondCurrency) {
        if (isNaN(amount) || parseInt(amount) === 0 || amount.trim() === "") {
          console.log(amount);
          setConversion("Choose an amount to convert");
        } else {
          showConversion();
        }
      } else {
        setConversion("Currencies are the same");
      }
    },
    [firstCurrency, secondCurrency, amount]
  );
  return (
    <div>
      <input value={amount} onChange={(e) => handleAmount(e.target.value)} />
      <select onChange={(e) => handleSelectFirst(e.target.value)}>
        <option value="USD">USD</option>
        <option selected value="BRL">
          BRL
        </option>
        <option value="EUR">EUR</option>
      </select>
      <select onChange={(e) => handleSelectSecond(e.target.value)}>
        <option selected value="USD">
          USD
        </option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <p>{conversion}</p>
    </div>
  );
}

export default App;
