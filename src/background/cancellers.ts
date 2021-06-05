import { browser } from "webextension-polyfill-ts";


function cancelRequest(request: { url: string, tabId: number }) {
    console.debug(`Cancelling request ${request.url}`);
    return { cancel: true };
}

const cancelPatterns = [];

if (cancelPatterns.length > 0) {
    browser.webRequest.onBeforeRequest.addListener(
        cancelRequest,
        {
            urls: cancelPatterns,
            types: ["script"],
        },
        ["blocking"]
    );
}