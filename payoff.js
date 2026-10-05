function calculateOneMonth(balance, apr, payment) {
  let interest = balance * apr / 100 / 12;
  let principal = payment - interest;
  let remaining = balance - principal;

  return { interest: interest, principal: principal, remaining: remaining };
}

console.log(calculateOneMonth(1000, 24, 100));

function round2(n) {
  return Math.round(n * 100) / 100;
}

function buildSchedule(balance, apr, payment) {
  let rows = [];
  let number = 1;

  while (balance > 0) {
    let interest = round2(balance * apr / 100 / 12);
    let thisPayment = payment;

    if (balance + interest < payment) {
      thisPayment = round2(balance + interest);
    }

    let principal = round2(thisPayment - interest);
    balance = round2(balance - principal);

    rows.push({ number: number, interest: interest, principal: principal, balance: balance });
    number = number + 1;
  }

  return rows;
}
function validateInputs(balance, apr, payment) {
  if (isNaN(balance) || isNaN(apr) || isNaN(payment)) {
    return "Please fill in all three fields with numbers.";
  }
  if (balance <= 0) {
    return "Balance must be greater than 0.";
  }
  if (apr < 0 || apr > 100) {
    return "APR must be between 0 and 100.";
  }
  let monthlyInterest = balance * apr / 100 / 12;
  if (payment <= monthlyInterest) {
    return "Payment must be greater than the monthly interest of " + round2(monthlyInterest) + ".";
  }
  return "";
}
console.log("good:", validateInputs(300, 12, 100));
console.log("bad apr:", validateInputs(300, 150, 100));
console.log("small payment:", validateInputs(1000, 24, 10));
console.log("empty:", validateInputs(NaN, 12, 100));