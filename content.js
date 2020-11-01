/**
 * This message listener finds author (moderator) of the DVTV video in the DOM and 
 * sends it in the reponse. It also receives and sends back id of tab, so it can be
 * possibly closed in the callback function.
 */
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'report_author') {
        const authorNodes = document.querySelectorAll(".author__name");
        let authorName;

        if (authorNodes.length > 0) {
            // Akutalne.cz site
            authorName = authorNodes[authorNodes.length - 1].innerText;
        } else {
            // DVTV site
            authorName = document.querySelector(".person__text").innerText;
        }

        sendResponse({
            name: authorName.trim(),
            tabId: msg.tabId
        });
    }
});