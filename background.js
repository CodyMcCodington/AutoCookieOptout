function cancelRequest(request) {
    console.debug(`Cancelling request ${request.url}`);
    return { cancel: true };
}

browser.webRequest.onBeforeRequest.addListener(
    cancelRequest,
    {
        urls: [
            "https://consent.truste.com/*",
            "https://sdk.privacy-center.org/*",
            "https://cdn.cookielaw.org/*",
            "https://quantcast.mgr.consensu.org/*"
        ],
        types: ["script"],
    },
    ["blocking"]
)