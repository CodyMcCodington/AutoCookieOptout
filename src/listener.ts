import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./clickers/cookiebot";
import handleConsensu from "./clickers/consensu";
import { Vendor } from './vendors';
import handleDidomi from "./clickers/didomi";
import handleCookiePro from "./clickers/cookiepro";

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<Vendor, Function> = {
    [Vendor.CookieBot]: handleCookieBot,
    [Vendor.Consensu]: handleConsensu,
    [Vendor.Didomi]: handleDidomi,
    [Vendor.CookiePro]: handleCookiePro,
};

const vendorsTriggered = [];

browser.runtime.onMessage.addListener(message => {
    console.debug(`Got message '${message}' from the background script`);

    if (mapper[message]) {
        if (!vendorsTriggered.includes(mapper[message])) {
            console.debug('Firing up clicker');
            mapper[message]();
        } else {
            console.debug('Clicker has been triggered on this page before, ignoring');
        }
    }
});

browser.runtime.sendMessage('tabReady');
console.debug('Pinged background script');