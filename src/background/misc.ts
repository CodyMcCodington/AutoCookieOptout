import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener(function (object) {
    if (object.reason === "install") {
        browser.tabs.create({
            url: browser.extension.getURL("src/pages/welcome.html"),
        });
    }
});