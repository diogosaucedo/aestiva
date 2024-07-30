import {reviewHomework, reviewHomeworkParcial, reviewMessage, reviewQuestion} from './features/index'

const homework = document.querySelector(".homework");
const parcial = document.querySelector(".parcial");
const question = document.querySelector(".question");
const message = document.querySelector(".message");

homework.addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reviewHomework,
  });
});

question.addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reviewQuestion,
  });
});

message.addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reviewMessage,
  });
});
parcial.addEventListener("click", async (e) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reviewHomeworkParcial,
  });
});
