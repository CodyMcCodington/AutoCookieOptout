import { clickWhenFound, clickWhenOneOfFollowingFound } from "../common";
import { log } from "../logger";

async function handle() {
    const fallbackSelector = '.qc-cmp2-summary-buttons button[mode=secondary]';

    // Sometimes Quantcast displays the optout button right away. Other times
    // we may have to go into advanced settings to opt out.
    const foundSelector = await clickWhenOneOfFollowingFound([
        '.qc-cmp2-summary-buttons button[aria-label="DISAGREE"]',
        fallbackSelector,
    ]);

    if (foundSelector === fallbackSelector) {
        log('Rejecting everything from the settings page');
        await clickWhenFound('.qc-cmp2-header-links button[aria-label="REJECT ALL"]');
        await clickWhenFound('.qc-cmp2-footer button[aria-label="SAVE & EXIT"]');
    }
    log('Quantcast popup dismissed');
}

export default handle;