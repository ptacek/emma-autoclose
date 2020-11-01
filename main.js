
const DVTV_URL = ['https://video.aktualne.cz/dvtv/', 'https://www.dvtv.cz/'];
const EMMA_NAME = 'EMMA SMETANA';


/**
 * This listener checks if the loaded page is DVTV; if so then it sends message
 * to content script
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {alert(isDvtv(tab));
  if (changeInfo.status == 'complete' && isDvtv(tab)) {
    chrome.tabs.sendMessage(tabId, {text: 'report_author', tabId: tabId}, closeIfEmma);
  }
});

/**
 * This a callback function which is called from the content script. Closes the tab if 
 * the author of the DVTV video is Emma.
 *
 * @param {Object} result data returned from the content script. Contains author name and id of the browser tab
 */
function closeIfEmma(result) {
  if (result && result.name.toUpperCase() == EMMA_NAME) {
    chrome.tabs.remove(result.tabId, function() { });
  }
}

/**
 * Simply checks if tab contains DVTV based on it's URL
 *
 * @param {Object} tab 
 */
function isDvtv(tab) {
  return DVTV_URL.filter(pUrl => tab.url.startsWith(pUrl)).length > 0;
}