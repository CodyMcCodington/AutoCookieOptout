import { clickAllWhenFound, clickWhenFound } from "../common";
import { log } from "../logger";

(async function() {
    if (document.location.pathname === '/index.html') {
        log('Detected Sourcepoint intro screen');
        await clickWhenFound('[aria-label="Options"]');
    } else if (document.location.pathname === '/privacy-manager/index.html') {
        log('Detected Sourcepoint options screen');

        // Explicitly opt out of legitimate interest items (enabled by default)
        await clickWhenFound('[aria-label="Legitimate Interest"]');
        await clickAllWhenFound('.pm-switch.checked .slider');
        await clickWhenFound('[aria-label="Save & Exit"]');
        log('Sourcepoint popup handled')
    } else {
        throw new Error('Did not match with any paths');
    }
})();