import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [conversion, setConversion] = useState(0);
  const [firstCurrency, setFirstCurrency] = useState("BRL");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [validAmount, setValidAmount] = useState(false);

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
        setConversion(test.toFixed(2));
      }

      if (firstCurrency !== secondCurrency) {
        if (isNaN(amount) || parseInt(amount) === 0 || amount.trim() === "") {
          console.log(amount);
          setValidAmount(false);
          setConversion("Choose an amount to convert");
        } else {
          setValidAmount(true);
          showConversion();
        }
      } else {
        setValidAmount(false);
        setConversion("Currencies are the same");
      }
    },
    [firstCurrency, secondCurrency, amount]
  );
  return (
    <div className="conversion-form">
      <h2>Pocket Exchange</h2>
      <img id="gif" src="./money.gif" alt="money gif" />
      <div className="currency-price">
        <p style={{ marginTop: "0px" }}>Set a price to convert:</p>
        <input
          id="conversionAmount"
          style={{ width: "50px", textAlign: "center" }}
          value={amount}
          onChange={(e) => handleAmount(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            marginTop: "3%",
            borderTop: "1px solid red",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>From: </p>
          <label class="select">
            <select
              id="box"
              className="select"
              onChange={(e) => handleSelectFirst(e.target.value)}
            >
              <option value="USD">USD</option>
              <option selected value="BRL">
                BRL
              </option>
              <option value="EUR">EUR</option>
              <option value="CNY">CNY</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="ILS">ILS</option>
            </select>
          </label>
        </div>
        <img
          id="conversion-icon"
          src="./conversion-icon.png"
          alt="conversion icon"
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>To: </p>
          <select
            id="secondCurrency"
            onChange={(e) => handleSelectSecond(e.target.value)}
          >
            <option selected value="USD">
              USD
            </option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="CNY">CNY</option>
            <option value="INR">INR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
            <option value="ILS">ILS</option>
          </select>
        </div>
      </div>
      {validAmount ? <p>Amount: {conversion}</p> : <p>{conversion}</p>}
    </div>
  );
}

export default App;
