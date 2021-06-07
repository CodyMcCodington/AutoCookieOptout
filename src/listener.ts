import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./clickers/cookiebot";
import handleConsensu from "./clickers/consensu";
import Vendor from './vendors';
import handleDidomi from "./clickers/didomi";
import handleCookiePro from "./clickers/cookiepro";

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<Vendor, Function> = {
    [Vendor.CookieBot]: handleCookieBot,
    [Vendor.Consensu]: handleConsensu,
    [Vendor.Didomi]: handleDidomi,
    [Vendor.CookiePro]: handleCookiePro,
};

browser.runtime.onMessage.addListener(message => {
    console.debug(`Got message '${message}' from the background script`);

    if (mapper[message]) {
        console.debug('Firing up clicker');
        mapper[message]();
    }
});

browser.runtime.sendMessage('tabReady');
console.debug('Pinged background script');