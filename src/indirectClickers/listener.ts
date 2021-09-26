import { browser } from "webextension-polyfill-ts";
import handleCookieBot from "./cookiebot";
import handleQuastcast from "./quantcast";
import { TriggeredVendor } from './vendors';
import handleDidomi from "./didomi";
import handleCookiePro from "./cookiepro";
import handleTrustArc from "./trustarc";
import { log, logError } from "../logger";
import { hasCookie } from "../common";

// To avoid unsafe dynamic imports, a mapping in needed
const mapper: Record<TriggeredVendor, Function> = {
    [TriggeredVendor.CookieBot]: handleCookieBot,
    [TriggeredVendor.CookiePro]: handleCookiePro,
    [TriggeredVendor.Didomi]: handleDidomi,
    [TriggeredVendor.Quastcast]: handleQuastcast,
    [TriggeredVendor.TrustArc]: handleTrustArc,
};

const vendorsTriggered: string[] = [];

browser.runtime.onMessage.addListener(async (message) => {
    try {
        log(`Got message '${message}' from the background script`);

        if (mapper[message]) {
            if (!vendorsTriggered.includes(message)) {
                log('Firing up clicker');
                await mapper[message]();
                vendorsTriggered.push(message);
                log(`Finished '${message}' handler execution`);
            } else {
                log('Clicker has been triggered on this page before, ignoring');
            }
        }
    } catch (error) {
        logError(error);
    }
});

browser.runtime.sendMessage('tabReady');
log('Pinged background script');