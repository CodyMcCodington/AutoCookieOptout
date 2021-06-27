import { clickAllElements, clickAllWhenFound, clickElement, clickWhenFound, retryUntil, untilStable } from "../common";
import { log } from "../logger";

(async function() {
    if (document.location.pathname === '/index.html') {
        log('Detected Sourcepoint intro screen');

        // Sourcepoint selectors are quite fuzzy due to variations and lack of language-independent
        // characteristics
        await clickWhenFound('.message-container .pg-configure-button, [aria-label="Options"],  [title="Options"]');
    } else if (document.location.pathname === '/privacy-manager/index.html') {
        log('Detected Sourcepoint options screen');
        await untilStable(200);

        // Opt out of anything that's enabled by default
        clickAllElements('.stack-toggle.reject-toggle, .pm-switch.checked .slider');

        // Explicitly opt out of legitimate interest items if the tab is present (enabled by default)
        const legitInterestSelector = '[aria-label="Legitimate Interest"], [title="Legitimate Interest"]';
        if (document.querySelector(legitInterestSelector)) {
            log('Found a legitimate interest tab, opting out of checked items')
            await clickWhenFound(legitInterestSelector);
            await clickAllWhenFound('.pm-switch.checked .slider');
        }

        await clickWhenFound('.message-container .pm-preferences-button, [aria-label="Save & Exit"], [title="Save & Exit"]');
        log('Sourcepoint popup handled');
    } else {
        throw new Error('Did not match with any paths');
    }
})();