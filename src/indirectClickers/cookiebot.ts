import { clickAllElements, clickAllWhenFound, clickElement, clickWhenFound, hasCookie, untilOneOfFollowingFound, untilStable } from "../common";
import { log } from "../logger";

async function handle() {
    const declineSelector = '#CybotCookiebotDialogBodyButtonDecline';
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

    const foundSelector = await untilOneOfFollowingFound([declineSelector, toggleSelector]);
    if (foundSelector === declineSelector) {
        // Easy way out this button may be invisible on screen but present in the DOM
        clickElement(declineSelector);
    } else if (foundSelector === toggleSelector) {
        // The design with the checkboxes in the popup
        clickAllElements(enabledTogglesSelector);
        await clickWhenFound('#CybotCookiebotDialogBodyLevelButtonAccept');
    } else {
        throw new Error('No matching UI found');
    }
}

export default handle;