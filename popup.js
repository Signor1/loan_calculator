chrome.runtime.getURL("./popup.html");

const loanAmount = document.getElementById("loan_amount"),
  loanTenure = document.getElementById("loan_tenure"),
  loanRate = document.getElementById("loan_interest");

const loanEmi = document.querySelector(".loan_emi"),
  loanPrinciple = document.querySelector(".loan_principle"),
  loanTotal = document.querySelector(".loan_total"),
  loanInterest = document.querySelector(".loan_interest_rate");

const submitBtn = document.querySelector(".calculator-btn");

submitBtn.addEventListener("click", () => {
  amount = loanAmount.value;
  tenure = loanTenure.value * 12; //1year = 12 months
  rate = loanRate.value / 12 / 100; //loan rate per year / 100 = loan percentage

  emi = (amount * rate * (1 + rate) ** tenure) / ((1 + rate) ** tenure - 1);
  total = emi * tenure; //total amount to be paid including interest
  interest = total - amount; //interest = total amount - principal amount

  const convert = (num) => {
    const localeString = new Intl.NumberFormat("en-US").format(num);
    return localeString;
  };

  loanEmi.innerHTML = `&#8358;${convert(Math.floor(emi))}`;
  loanPrinciple.innerHTML = `&#8358;${convert(Math.floor(amount))}`;
  loanTotal.innerHTML = `&#8358;${convert(Math.floor(total))}`;
  loanInterest.innerHTML = `&#8358;${convert(Math.floor(interest))}`;

  //loan Chart
  let xValues = ["Principal", "Interest"];
  let yValues = [amount, Math.floor(interest)];

  let barColors = ["#EB455F", "#000000"];

  new Chart("loanChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: false,
      },
    },
  });
});
