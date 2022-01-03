import { assertNotPresent, attachPageScriptForClicker, clickAllWhenFound, clickWhenFound, hasCookie, untilStable } from "../common";
import { log } from "../logger";

async function handle() {
    const moreInfoSelector = '#didomi-notice-learn-more-button';

    // If a consent cookie is already present, hold on a little bit in case
    // the website is going to ask for permission again
    if (hasCookie('euconsent-v2')) {
        await untilStable(1000);
        if (!document.querySelector(moreInfoSelector)) {
            log('Assuming already opted out of Didomi');
            return;
        }
    }

    await clickWhenFound(moreInfoSelector);

    // There are no CSS class differences between agree/disagree to play off, so we'll have to sanity check
    // after clicking before the final submit
    log('Handling the purpose list');
    await clickAllWhenFound('.didomi-components-radio .didomi-components-radio__option--unselected:first-child');
    assertNotPresent('.didomi-components-radio__option--agree');

    // Same thing with the vendor list
    await clickWhenFound('.didomi-consent-popup-view-vendors-list-link');
    log('Handling the vendor list');
    await clickWhenFound('.didomi-components-radio .didomi-components-radio__option--unselected:first-child');
    assertNotPresent('.didomi-components-radio__option--agree');

    // Saving vendor list returns to main popup, than save that too
    log('Saving the popups');
    await clickWhenFound('button[aria-describedby="didomi-popup-vendors-title"]')
    await clickWhenFound('[aria-describedby="didomi-consent-popup-information-save"]')
}

export default handle;