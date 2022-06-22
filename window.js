//query active tags on edstem.org
chrome.tabs.query({ active: true, url: "https://edstem.org/*" }, (tabs) => {
  const url = tabs && tabs[0] && tabs[0].url;
  const node = document.getElementById("url");
  node.value = url;
  chrome.storage.sync.get(url, (savedValue) => {
    const textarea = document.getElementById("textarea");
    textarea.innerHTML = savedValue[url] || "";
  });
});

//copy button handler
document.getElementById("copy-btn").onclick = () => {
  const copyText = document.getElementById("textarea");
  const msgArea = document.getElementById("msg-area");
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  msgArea.innerHTML = "Copied!";
  clearMsgArea(3000);
};

//helper function to clear button message text
clearMsgArea = (time) => {
  setTimeout(() => {
    const msgArea = document.getElementById("msg-area");
    msgArea.innerHTML = "";
  }, time);
};

//send message to content script to grab the title
chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
  chrome.tabs.sendMessage(tab[0].id, "get-header", function (response) {
    console.log(response);
    const headerInput = document.getElementById("header");
    headerInput.value = response;
  });
});
