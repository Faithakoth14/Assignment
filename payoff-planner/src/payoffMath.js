export function round2(n) {
  return Math.round(n * 100) / 100;
}

export function validateInputs(balance, apr, payment) {
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

export function buildSchedule(balance, apr, payment) {
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

export function getTotalInterest(rows) {
  let total = 0;

  for (let i = 0; i < rows.length; i = i + 1) {
    total = total + rows[i].interest;
  }

  return round2(total);
}

export function getInterestSoFar(rows, month) {
  let total = 0;

  for (let i = 0; i < month && i < rows.length; i = i + 1) {
    total = total + rows[i].interest;
  }

  return round2(total);
}