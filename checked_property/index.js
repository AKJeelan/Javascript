// .checked = property that determines the checked state of an
//                     HTML checkbox or radio button element

const myCheckBox = document.getElementById("myCheckBox");
const visaBtn = document.getElementById("visaBtn");
const masterCardBtn = document.getElementById("masterCardBtn");
const payPalBtn = document.getElementById("payPalBtn");
const mySubmitBtn = document.getElementById("mySubmit");
const submitResult = document.getElementById("subResult");
const paymentResult = document.getElementById("paymentResult");

mySubmit.onclick = function () {
  if (myCheckBox.checked) {
    submitResult.textContent = `You are Subscribed`;
  } else {
    submitResult.textContent = `You are not Subscribed`;
  }

  if (visaBtn.checked) {
    paymentResult.textContent = `Your are paying with Visa`;
  } else if (masterCardBtn.checked) {
    paymentResult.textContent = `Your are paying with Master Card`;
  } else if (payPalBtn.checked) {
    paymentResult.textContent = `Your are paying with PayPal`;
  } else {
    paymentResult.textContent = `You must select a payment type`;
  }
};
