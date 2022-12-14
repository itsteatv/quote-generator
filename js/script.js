"use strict";

// Dark Mode
let toggle = document.querySelector(".ri-moon-fill");
let darkMode = document.querySelector(".dark-mode");
let setDarkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggle.classList.toggle("ri-sun-fill");
  darkMode.classList.toggle("active");
};

const disableDarkMode = () => {
  toggle.classList.toggle("ri-sun-fill");
  darkMode.classList.toggle("active");
};

toggle.addEventListener("click", () => {
  setDarkMode = localStorage.getItem("dark-mode");

  if (setDarkMode !== "on") {
    enableDarkMode();
    setDarkMode = localStorage.setItem("dark-mode", "on");
  } else {
    disableDarkMode();
    setDarkMode = localStorage.setItem("dark-mode", null);
  }
});

setDarkMode === "on" ? enableDarkMode() : "";

// Quote Generator
const quoteContainer = document.querySelector(".q-container");
const quotesText = document.querySelector(".quote-text");
const quoteBtn = document.querySelector(".new-quote");
const quoteAuthor = document.querySelector(".author");
const copyBtn = document.querySelector("#copy");
const twitterBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

// Loader

// Showing Loader Spinner
const loadingQuote = function() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hiding Loader Spinner
const quoteLoaded = function() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const quotesGeneratorData = async function () {
  try {
    // Loading spinner
    loadingQuote();
    // Adding Loading Effect
    quoteBtn.classList.add("loading");
    // Loading New Quote
    quoteBtn.innerText = "Loading...";
    // Fetching Data from API
    const fetchData = await fetch("https://api.quotable.io/random");
    // Getting Actual & Readable Data From API
    const jsonData = await fetchData.json();
    // Error Handling
    if (!fetchData) throw new Error(`Something Went Wrong ⚠️`);
    // Changing HTMl Content
    quotesText.innerHTML = jsonData.content;
    quoteAuthor.innerHTML = `"${jsonData.author}"`;
    // New Quotes Has Been Loaded
    quoteBtn.innerHTML = "New Quote";
    // Removing Loading Spinner
    quoteLoaded();
    // Removing Loading Effect
    quoteBtn.classList.remove("loading");
  } catch (error) {
    console.error(`${error}`);
  }
};

// ClipBoard Feature
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quotesText.innerHTML}`);
});

// Twitter Url (You can tweet your favorite quote that you have generated 🔥)
twitterBtn.addEventListener("click", () => {
  const twitterUrl = `https://twitter.com/intent/tweet?url=${quotesText.innerHTML} ${quoteAuthor.innerHTML}`;
  window.open(twitterUrl, "_blank");
});

quoteBtn.addEventListener("click", quotesGeneratorData);
// before page loads, quotes will be loaded for user
document.addEventListener("DOMContentLoaded", quotesGeneratorData);
// You can also call "quotesGeneratorData" function for loading quotes: 👇
// quotesGeneratorData();