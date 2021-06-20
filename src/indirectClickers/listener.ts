import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./cookiebot";
import handleConsensu from "./consensu";
import { TriggeredVendor } from './vendors';
import handleDidomi from "./didomi";
import handleCookiePro from "./cookiepro";
import handleTrustArc from "./trustarc";

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<TriggeredVendor, Function> = {
    [TriggeredVendor.CookieBot]: handleCookieBot,
    [TriggeredVendor.CookiePro]: handleCookiePro,
    [TriggeredVendor.Consensu]: handleConsensu,
    [TriggeredVendor.Didomi]: handleDidomi,
    [TriggeredVendor.TrustArc]: handleTrustArc,
};

const vendorsTriggered = [];

browser.runtime.onMessage.addListener(message => {
    console.debug(`Got message '${message}' from the background script`);

    if (mapper[message]) {
        if (!vendorsTriggered.includes(mapper[message])) {
            if (document.cookie.match('euconsent-v2=')) {
                console.debug('Consent cookie found, assuming already opted out');
            } else {
                console.debug('Firing up clicker');
                mapper[message]();
            }
        } else {
            console.debug('Clicker has been triggered on this page before, ignoring');
        }
    }
});

browser.runtime.sendMessage('tabReady');
console.debug('Pinged background script');