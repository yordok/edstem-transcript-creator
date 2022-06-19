console.log("starting extension...");

const content = {};
//TODO refactor out of ugly callback hell...
//add a listener to to check when an srt has been downloaded
chrome.webRequest.onCompleted.addListener(
  (details) => {
    const url = details.url;
    if (details.tabId > 0) {
      //get the tab where the request has been made, use the url in this tab to index the call
      chrome.tabs.get(details.tabId, (tab) => {
        chrome.storage.sync.get([tab.url], (stored) => {
          if (Object.keys(stored).length === 0) {
            //fetch the .srt file from kaltura
            fetch(url)
              .then((r) => r.text())
              .then((parsedText) => {
                //parse and store the transcript
                const fullText = parseSrt(parsedText);
                const newStoredValue = {};
                newStoredValue[tab.url] = fullText;
                console.log(fullText);
                chrome.storage.sync.set(newStoredValue, () => {
                  console.log(`saving under key ${tab.url}...`);
                });
              });
          }
        });
      });
    }
  },
  { urls: ["https://cfvod.kaltura.com/*.srt"] }
);

/**
 * takes in raw srt text and returns the captions concatenated into a transcript
 *
 * @param {string} rawText raw srt text to be parsed
 * @returns
 */
const parseSrt = (rawText = "") => {
  const lines = rawText.split("\n");
  let fullText = "";
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    //disregard the line if
    //it's empty
    //is has an arrow
    //is just a number
    if (l.length === 0 || l.includes("-->") || !isNaN(parseInt(l))) {
      continue;
    } else {
      fullText = fullText + " " + l;
    }
  }
  return fullText;
};
