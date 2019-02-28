let tabsIdsToDbIds = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.id) {
        case "ADD_ID":
            console.log(request);
            tabsIdsToDbIds[sender.tab.id] = {recordId: request.recordId, url: request.url};
            sendResponse();
            break;
        default:
            break;
    }
});
chrome.tabs.onRemoved.addListener(function (tabId) {
    if (tabsIdsToDbIds.hasOwnProperty(tabId)) {
        let recordId = tabsIdsToDbIds[tabId].recordId;
        let parser = document.createElement('a');
        parser.href = tabsIdsToDbIds[tabId].url;
        if (/^http/.test(tabsIdsToDbIds[tabId].url)) {
            chrome.tabs.create({
                'url': chrome.extension.getURL('mark.html') + '?recordId=' + encodeURIComponent(recordId) + '&' +
                'url=' + encodeURIComponent(parser.hostname)
            }, function () {
                delete tabsIdsToDbIds[tabId];
            });
        }
    }
});