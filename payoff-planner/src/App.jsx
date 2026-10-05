import { useState } from "react";
import "./App.css";
import { validateInputs, buildSchedule, getTotalInterest, getInterestSoFar } from "./payoffMath.js";

function formatMoney(n) {
  return n.toFixed(2);
}

function App() {
  const [balance, setBalance] = useState("");
  const [apr, setApr] = useState("");
  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [startBalance, setStartBalance] = useState(0);
  const [month, setMonth] = useState(0);

  function handleBalanceChange(event) {
    setBalance(event.target.value);
  }

  function handleAprChange(event) {
    setApr(event.target.value);
  }

  function handlePaymentChange(event) {
    setPayment(event.target.value);
  }

  function handleMonthChange(event) {
    setMonth(Number(event.target.value));
  }

  function handleCalculate() {
    const message = validateInputs(Number(balance), Number(apr), Number(payment));
    setError(message);

    if (message !== "") {
      setRows([]);
      return;
    }

    const schedule = buildSchedule(Number(balance), Number(apr), Number(payment));
    setStartBalance(Number(balance));
    setRows(schedule);
    setMonth(schedule.length);
  }

  let balanceAtMonth = 0;
  if (rows.length > 0 && month >= 1) {
    balanceAtMonth = rows[month - 1].balance;
  }

  return (
    <div className="app">
      <h1>Credit Card Payoff Planner</h1>

      <div className="field">
        <label>Balance</label>
        <input
          type="number"
          value={balance}
          onChange={handleBalanceChange}
        />
      </div>
      <div className="field">
        <label>APR (%)</label>
        <input
          type="number"
          value={apr}
          onChange={handleAprChange}
        />
      </div>
      <div className="field">
        <label>Monthly payment</label>
        <input
          type="number"
          value={payment}
          onChange={handlePaymentChange}
        />
      </div>

      <button className="calculate-button" onClick={handleCalculate}>Calculate</button>
      {error !== "" && <p className="error">{error}</p>}

      {rows.length > 0 && (
        <div className="summary">
          <h2>Summary</h2>
          <p>Starting balance: {formatMoney(startBalance)}</p>
          <p>Total interest paid: {formatMoney(getTotalInterest(rows))}</p>
          <progress value={getTotalInterest(rows)} max={startBalance}></progress>
          <p>Months to pay off: {rows.length}</p>

          <h3>Explore month by month</h3>
          <input
            className="slider"
            type="range"
            min="1"
            max={rows.length}
            value={month}
            onChange={handleMonthChange}
          />
          <p>After month {month}:</p>
          <p>Interest paid so far: {formatMoney(getInterestSoFar(rows, month))}</p>
          <progress value={getInterestSoFar(rows, month)} max={startBalance}></progress>
          <p>Remaining balance: {formatMoney(balanceAtMonth)}</p>
        </div>
      )}

      {rows.length > 0 && (
        <table className="schedule">
          <thead>
            <tr>
              <th>Payment #</th>
              <th>Interest</th>
              <th>Principal paid</th>
              <th>Remaining balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(function (row) {
              return (
                <tr key={row.number}>
                  <td>{row.number}</td>
                  <td>{formatMoney(row.interest)}</td>
                  <td>{formatMoney(row.principal)}</td>
                  <td>{formatMoney(row.balance)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;