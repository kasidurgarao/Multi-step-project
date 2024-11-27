const nextbutton = document.getElementById("next-step");
const prevbutton = document.getElementById("go-back");
const changeheader = document.querySelector(".header-change h1");
// console.log(changeheader.textContent)
const changesubheader = document.querySelector(".header-change p");

let header = [
  "Personal info",
  "Select your plan",
  "Pick add-ons",
  "Finishing up",
  "Thank you!",
];

let subheader = [
  "Please provide your name, email address, and phone number.",
  "You have the option of monthly or yearly billing.",
  "Add-ons help enhance your gaming experience.",
  "Double-check everything looks OK before confirming.",
  "Thank you! Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.",
];

let counter = 1;

nextbutton.addEventListener("click", () => {
  if (counter === 1) {
    if (pageonevalidation(counter)) {
      movetonextpage(counter);
      counter++;
    }
  } else {
    movetonextpage(counter);
    counter++;
  }
});

prevbutton.addEventListener("click", () => {
  if (counter > 1) {
    movetoprevpage(counter);
    counter--;
  }
});

function pageonevalidation(count) {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  // Regex for email and phone validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  let isValid = true;

  if (!nameField.value.trim()) {
    nameError.classList.remove("hidden");
    nameField.classList.add("border-red-500");
    isValid = false;
  } else {
    nameError.classList.add("hidden");
    nameField.classList.remove("border-red-500");
  }

  if (!emailField.value.trim() || !emailRegex.test(emailField.value.trim())) {
    emailError.classList.remove("hidden");
    emailField.classList.add("border-red-500");
    isValid = false;
  } else {
    emailError.classList.add("hidden");
    emailField.classList.remove("border-red-500");
  }

  if (!phoneField.value.trim() || !phoneRegex.test(phoneField.value.trim())) {
    phoneError.classList.remove("hidden");
    phoneField.classList.add("border-red-500");
    isValid = false;
  } else {
    phoneError.classList.add("hidden");
    phoneField.classList.remove("border-red-500");
  }
  return isValid;
}

function movetonextpage(count) {
  console.log(count);
  const currentPage = document.querySelector(`.page${count}`);
  const nextPage = document.querySelector(`.page${count + 1}`);
  const currentstep = document.querySelector(`.step${count}`);
  const nextstep = document.querySelector(`.step${count + 1}`);
  console.log(currentstep);
  if (currentPage) {
    currentPage.classList.add("hidden");
  }
  if (nextPage) {
    nextPage.classList.remove("hidden");
  }
  prevbutton.classList.remove("invisible");

  nextstep.style.backgroundColor = "#bfdbfe";
  nextstep.style.color = "black";

  currentstep.style.color = "white";
  currentstep.style.border = "1px solid white";
  currentstep.style.backgroundColor = "transparent";

  changeheader.innerHTML = header[count];
  changesubheader.innerHTML = subheader[count];
}
function movetoprevpage(count) {
  const currentPage = document.querySelector(`.page${count}`);
  const prevPage = document.querySelector(`.page${count - 1}`);
  const currentstep = document.querySelector(`.step${count}`);
  const prevstep = document.querySelector(`.step${count - 1}`);

  if (currentPage) {
    currentPage.classList.add("hidden");
  }
  if (prevPage) {
    prevPage.classList.remove("hidden");
  }

  changeheader.innerHTML = header[count - 2];
  changesubheader.innerHTML = subheader[count - 2];
  if (counter - 1 === 1) {
    prevbutton.classList.add("invisible");
  }

  prevstep.style.backgroundColor = "#bfdbfe";
  prevstep.style.color = "black";

  currentstep.style.color = "white";
  currentstep.style.border = "1px solid white";
  currentstep.style.backgroundColor = "transparent";
}

let togglebutton = document.getElementById("togglebutton");
let priceElements = document.querySelectorAll(".price");
let freeMonthElements = document.querySelectorAll(".free-month");
let toggleyear = document.querySelector(".toggleyear");
let togglemonth = document.querySelector(".togglemonth");
let multicardPage2 = document.querySelector(".multi-cards");

// PAGE TWO FUNCTIONALITY

let value = 0;
let selectedCard = null;
let dataArr = [];
function fetchPrice(cardType, mode) {
  const prices = {
    Arcade: { monthly: 9, yearly: 90 },
    Advanced: { monthly: 12, yearly: 120 },
    Pro: { monthly: 15, yearly: 150 },
  };
  return prices[cardType][mode];
}

// Function to update prices dynamically

function updatePricesinPage2() {
  const mode = value === 1 ? "yearly" : "monthly";
  priceElements.forEach((element, index) => {
    const cardType = element.closest(".card").querySelector("h2").textContent;
    const price = fetchPrice(cardType, mode);
    element.textContent = `$${price}/${mode === "yearly" ? "yr" : "mo"}`;

    if (value === 1) {
      toggleyear.style.color = "#1e3a8a";
      toggleyear.style.fontWeight = "700";
      togglemonth.style.color = "#4b5563";
      if (freeMonthElements[index]) {
        freeMonthElements[index].textContent = "2 months free";
      }
    } else {
      togglemonth.style.color = "#1e3a8a";
      toggleyear.style.color = "#4b5563";
      if (freeMonthElements[index]) {
        freeMonthElements[index].textContent = "";
      }
    }
  });

  if (selectedCard) {
    displayCardPrice(selectedCard);
  }
}

function applyCardStyles(card) {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((element) => {
    element.style.border = "";
    element.style.backgroundColor = "";
    element.style.color = "";
  });

  card.style.border = "1px solid hsl(213, 96%, 18%)";
  card.style.backgroundColor = "hsl(206, 94%, 87%)";
}

function displayCardPrice(card) {
  const cardType = card.querySelector("h2").textContent;
  const mode = value === 0 ? "monthly" : "yearly";
  const price = fetchPrice(cardType, mode);
  // console.log(price)
  let cardDetails = `${cardType}: $${price}/${mode === "yearly" ? "yr" : "mo"}`;
  dataArr = cardDetails;
  console.log(dataArr);
}

togglebutton.addEventListener("change", () => {
  value = togglebutton.checked ? 1 : 0;
  updatePricesinPage2();
  updatePricesinPage3();
});

multicardPage2.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    selectedCard = card;
    applyCardStyles(card);
    displayCardPrice(card);
  }
});

// PAGE THREE FUNCTIONALITY
let addonsArr = [10, 20, 20];
let addonsArr2 = [1, 2, 2];
let addon = document.querySelectorAll(".addon");

console.log(addon);
function updatePricesinPage3() {
  addon.forEach((element, index) => {
    if (value === 1) {
      element.textContent = `+$${addonsArr[index]}/yr`;
    } else {
      element.textContent = `+$${addonsArr2[index]}/mo`;
    }
  });
}

let alladons = document.querySelectorAll(".alladdons");
let selectedServices = {};

alladons.forEach((element, index) => {
  const addinput = element.querySelector("input[type='checkbox']");
  const addonName = element.querySelector("h2").textContent;
  console.log(addonName);
  addinput.addEventListener("change", () => {
    if (addinput.checked) {
      if (togglebutton.checked) {
        selectedServices[addonName] = `+$${addonsArr[index]}/yr`;
      } else {
        selectedServices[addonName] = `+$${addonsArr2[index]}/mo`;
        
      }
      element.style.borderColor = "indigo";
      element.style.backgroundColor = "rgba(123, 3, 209,0.1)";
    }
    else{
      delete selectedServices[addonName];
      element.style.borderColor = "black";
      element.style.backgroundColor = "transparent"
    }
    console.log(selectedServices);
  });
});

// /PAGE FOUR FUNCTIONALITY

let getlink = document.querySelector('a')
getlink.addEventListener('click',()=>{
    let page2 = document.querySelector('.page2');
    let currentPage = document.querySelector(`.page${counter}`);
    currentPage.classList.add('hidden');
    page2.classList.remove('hidden');
    changeheader.innerHTML = header[1];
    changesubheader.innerHTML = subheader[1];
    counter=2
})
