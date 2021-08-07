import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./cookiebot";
import handleQuastcast from "./quantcast";
import { TriggeredVendor } from './vendors';
import handleDidomi from "./didomi";
import handleCookiePro from "./cookiepro";
import handleTrustArc from "./trustarc";
import { log } from "../logger";
import { hasCookie } from "../common";

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<TriggeredVendor, Function> = {
    [TriggeredVendor.CookieBot]: handleCookieBot,
    [TriggeredVendor.CookiePro]: handleCookiePro,
    [TriggeredVendor.Didomi]: handleDidomi,
    [TriggeredVendor.Quastcast]: handleQuastcast,
    [TriggeredVendor.TrustArc]: handleTrustArc,
};

const vendorsTriggered = [];

browser.runtime.onMessage.addListener(message => {
    log(`Got message '${message}' from the background script`);

    if (mapper[message]) {
        if (!vendorsTriggered.includes(mapper[message])) {
            if (hasCookie('euconsent-v2')) {
                log('Consent cookie found, assuming already opted out');
            } else {
                log('Firing up clicker');
                mapper[message]();
            }
        } else {
            log('Clicker has been triggered on this page before, ignoring');
        }
    }
});

browser.runtime.sendMessage('tabReady');
log('Pinged background script');