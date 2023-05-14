//object to store currency and their value in cents
const currencyNotes = {
  "PENNY": 1,
  "NICKEL": 5,
  "DIME": 10,
  "QUARTER": 25,
  "ONE": 100,
  "FIVE": 500,
  "TEN": 1000,
  "TWENTY": 2000,
  "ONE HUNDRED": 10000
}
// price = the price of the product
// cash = the amount of cash paid
// cid = cash in drawer
function checkCashRegister(price, cash, cid) {
  let changeTot = cash * 100 - price * 100;
  let changeTotVals = changeTot;
  let change = [];
  let status = '';

  let cidSum = 0;
  // filter through array and ignore money value that are 0 and reverse to start from the biggest denomination first
  let filteredCid = cid.filter(elem => elem[1] !== 0).reverse();

  // function to check if there is enough money in the register starting from the $100 bills
  // curr = to the money denomination
  filteredCid.forEach(elem => {
    let curr = elem[0];
    let currSum = elem[1] * 100;
    //the cidSum is calculated by adding amount of money * 100
    cidSum += currSum;
    let amount = 0;
    // while loop to chech if the total change is greater than the current denomination of money
    //currSum = to the sum of the denomination of money
    while (changeTot >= currencyNotes[curr] && currSum > 0){
      amount += currencyNotes[curr];
      changeTot -= currencyNotes[curr];
      currSum -= currencyNotes[curr];
    }
    console.log(currSum);
    if (amount !== 0){
      change.push([curr, amount / 100]);
    }
  });
  console.log(cidSum);
  console.log(change);
  if(changeTot > 0){
    status = 'INSUFFICIENT_FUNDS';
    change = [];
  }else if (changeTot == 0 && changeTotVals == cidSum){
    status = 'CLOSED';
    change = cid;
  }else {
    status = 'OPEN';
  }
  console.log({ 'status': status, 'change': change})
  return { 'status': status, 'change': change};
}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);