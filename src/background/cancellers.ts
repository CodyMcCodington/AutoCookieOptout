import { browser } from "webextension-polyfill-ts";


function cancelRequest(request: { url: string, tabId: number }) {
    console.debug(`Cancelling request ${request.url}`);
    return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
    cancelRequest,
    {
        urls: [
            "https://consent.truste.com/*",
            "https://sdk.privacy-center.org/*",
            "https://quantcast.mgr.consensu.org/*"
        ],
        types: ["script"],
    },
    ["blocking"]
);