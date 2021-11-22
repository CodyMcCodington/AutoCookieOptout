import { clickAllElements, clickAllWhenFound, clickWhenFound, hasCookie, untilOneOfFollowingFound, untilStable } from "../common";
import { log } from "../logger";

async function handle() {
    const toggleSelector = 'input.CybotCookiebotDialogBodyLevelButton';
    const enabledTogglesSelector = `${toggleSelector}:checked:not(:disabled)`;

    // If a consent cookie is present, wait a bit longer in case a consent reprompt might be
    // forthcoming. Only take action if needed.
    if (hasCookie('CookieConsent')) {
        await untilStable(1000);
        if (!document.querySelector(toggleSelector)) {
            log('Cookiebot cookie detected, assuming already opted out');
            return;
        }
    }

    await untilOneOfFollowingFound([toggleSelector]);
    clickAllElements(enabledTogglesSelector);
    await clickWhenFound('#CybotCookiebotDialogBodyLevelButtonAccept');
}

export default handle;