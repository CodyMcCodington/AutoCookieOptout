import { browser } from "webextension-polyfill-ts";


function cancelRequest(request: { url: string, tabId: number }) {
    console.debug(`Cancelling request ${request.url}`);
    return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
    cancelRequest,
    {
        urls: [
            "https://sdk.privacy-center.org/*",
        ],
        types: ["script"],
    },
    ["blocking"]
);