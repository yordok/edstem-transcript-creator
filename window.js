//query active tags on edstem.org
chrome.tabs.query({ active: true, url: "https://edstem.org/*" }, (tabs) => {
  const url = tabs[0].url;
  //set the url value and the textarea value in the UI
  const node = document.getElementById("url");
  node.innerHTML = url;
  chrome.storage.sync.get(url, (savedValue) => {
    const textarea = document.getElementById("textarea");
    textarea.innerHTML = savedValue[url];
  });
});
