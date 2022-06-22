console.log("ed transcript creator content script loaded...");

//listen for messages to grab the title on the current page and send it to the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message === "get-header") {
    const headerText = document.getElementsByClassName("navbar-title");
    sendResponse(headerText[0].innerHTML || "");
  }
});
