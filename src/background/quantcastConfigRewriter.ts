import { browser } from "webextension-polyfill-ts";

/**
 * Ensures that Quantcast websites show the optout button on the first screen
 * to speed things up and have less edge cases to cover
 */
function rewriteQuantcastConfig(data: { requestId: string }) {
    console.debug(data);

    const filter = browser.webRequest.filterResponseData(data.requestId);
    const decoder = new TextDecoder("utf-8");
    const encoder = new TextEncoder();

    filter.ondata = event => {
        const originalBody = decoder.decode(event.data, {stream: true});
        const editedBody = originalBody
            .replace("'initScreenRejectButtonShowing':false", "'initScreenRejectButtonShowing':true");
        console.debug(originalBody);
        console.debug(editedBody);
        filter.write(encoder.encode(editedBody));
        filter.disconnect();
    }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
    rewriteQuantcastConfig,
    {
        urls: ['https://quantcast.mgr.consensu.org/choice/*/*/choice.js'],
        types: ["script"],
    },
    ['blocking'],
)