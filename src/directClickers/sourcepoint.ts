import { clickAllWhenFound, clickWhenFound } from "../common";

(async function() {
    if (document.location.pathname === '/index.html') {
        console.debug('Detected Sourcepoint intro screen');
        await clickWhenFound('[aria-label="Options"]');
    } else if (document.location.pathname === '/privacy-manager/index.html') {
        console.debug('Detected Sourcepoint options screen');

        // Explicitly opt out of legitimate interest items (enabled by default)
        await clickWhenFound('[aria-label="Legitimate Interest"]');
        await clickAllWhenFound('.pm-switch.checked .slider');
        await clickWhenFound('[aria-label="Save & Exit"]');
        console.debug('Sourcepoint popup handled')
    } else {
        throw new Error('Did not match with any paths');
    }
})();