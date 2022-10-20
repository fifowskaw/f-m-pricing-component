const BILLING_CHOOSER_BUTTON = document.querySelector(".billing_chooser");
const BILLING_CHOOSER_BALL = document.querySelector(".billing_chooser_ball");
const INPUT = document.querySelector("input[type=range]");
const INPUT_SLIDER = document.querySelector(".chooser .placeholder");

const PAGEVIEWS = document.querySelector(".pageviews");
const PRICE = document.querySelector(".price_info_price div:nth-child(1)");

let billingType = "monthly";
let views = "100K";
let monthBill = 16;

const changeBilling = () => {
  if (billingType === "monthly") {
    if (window.matchMedia("(max-width: 480px)")) {
      BILLING_CHOOSER_BALL.style.left = "20px";
    } else {
      BILLING_CHOOSER_BALL.style.left = "25px";
    }
    PRICE.style.color = "var(--color-light-red)";
    billingType = "yearly";
    renderCost();
  } else if (billingType === "yearly") {
    BILLING_CHOOSER_BALL.style.left = "5px";
    PRICE.style.color = "var(--color-dark-blue)";
    billingType = "monthly";
    renderCost();
  }
};

const changeBackground = (e) => {
  let min = e.target.min;
  let max = e.target.max;
  let val = e.target.value;

  let widthPercent = ((val - min) * 100) / (max - min);
  widthPercent = Number(widthPercent.toFixed(0));
  let widthValue = 0;

  //console.log(window.matchMedia("(max-width: 480px)").matches);
  if (window.matchMedia("(max-width: 480px)").matches) {
    widthValue = 240 * (widthPercent / 100);
    widthValue = widthValue - widthValue * 0.15;
  } else {
    widthValue = 480 * (widthPercent / 100);
    widthValue = widthValue - widthValue * 0.08;
  }

  INPUT_SLIDER.style.width = `${widthValue}px`;
};

const calcCost = (e) => {
  let inputValue = e.target.value;

  switch (inputValue) {
    case "1":
      views = "10K";
      monthBill = 8;
      break;
    case "2":
      views = "50K";
      monthBill = 12;
      break;
    case "3":
      views = "100K";
      monthBill = 16;
      break;
    case "4":
      views = "500K";
      monthBill = 24;
      break;
    case "5":
      views = "1M";
      monthBill = 36;
      break;
    default:
      views = "100K";
      monthBill = 16;
  }

  renderCost();
};

const renderCost = () => {
  if (billingType === "monthly") {
    console.log("Views: " + views);
    console.log("Cost: " + monthBill);

    PAGEVIEWS.textContent = `${views}`;
    PRICE.textContent = `$${monthBill}.00`;
  } else if (billingType === "yearly") {
    console.log("Views: " + views);
    console.log("Cost: " + monthBill * 0.75);

    PAGEVIEWS.textContent = `${views}`;
    PRICE.textContent = `$${monthBill * 0.75}.00`;
  }
};

BILLING_CHOOSER_BUTTON.addEventListener("click", changeBilling);
INPUT.addEventListener("input", changeBackground);
INPUT.addEventListener("input", calcCost);
