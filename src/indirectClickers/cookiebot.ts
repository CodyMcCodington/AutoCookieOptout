import { clickAllWhenFound, clickWhenFound, hasCookie, untilStable } from "../common";
import { log } from "../logger";

async function handle() {
    const initialSelector = 'input.CybotCookiebotDialogBodyLevelButton:checked:not(:disabled)';

    // If a consent cookie is present, wait a bit longer in case a consent reprompt might be
    // forthcoming. Only take action if needed.
    if (hasCookie('CookieConsent')) {
        await untilStable(1000);
        if (!document.querySelector(initialSelector)) {
            log('Cookiebot cookie detected, assuming already opted out');
            return;
        }
    }

    await clickAllWhenFound(initialSelector);
    await clickWhenFound('#CybotCookiebotDialogBodyLevelButtonAccept');
}

export default handle;