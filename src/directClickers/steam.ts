import { clickWhenFound, getCookie } from "../common";
import { log } from "../logger";

(async () => {
    if (getCookie('cookieSettings')) {
        log('Assuming already opted out at Steam');
        return;
    }

    // FYI: even their Reject All button does not opt out of UTM tracking.
    // It can be done at https://store.steampowered.com/account/cookiepreferences if
    // really desired.
    log('Wait for cookie popup to be made visible');
    await clickWhenFound('#cookiePrefPopup[style="display: block;"] #rejectAllButton');
})();