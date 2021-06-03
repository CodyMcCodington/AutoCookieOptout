import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./clickers/cookiebot";
import Vendor from './vendors';

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<Vendor, Function> = {
    [Vendor.CookieBot]: handleCookieBot,
};

browser.runtime.onMessage.addListener(message => {
    console.log(`Got message '${message}' from the background script`);

    if (mapper[message]) {
        console.log('Firing up script');
        mapper[message]();
    }
});

browser.runtime.sendMessage('tabReady');
console.debug('Pinged background script');