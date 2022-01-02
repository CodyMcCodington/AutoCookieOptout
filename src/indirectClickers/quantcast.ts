import { clickElement, clickElementIfTextMatches, clickWhenFound, clickWhenOneOfFollowingFound, hasCookie, untilOneOfFollowingFound, untilStable } from "../common";
import { log } from "../logger";

async function handle() {
    const fallbackSelector = '.qc-cmp2-summary-buttons button[mode=secondary]';

    // If a consent cookie is already present, hold on a little bit in case
    // the website is going to ask for permission again
    if (hasCookie('euconsent-v2')) {
        await untilStable(1000);
        if (!document.querySelector(fallbackSelector)) {
            log('Assuming already opted out of Quantcast');
            return;
        }
    }

    // Sometimes Quantcast displays the optout button right away. Other times
    // we may have to go into advanced settings to opt out.
    const foundSelector = await clickWhenOneOfFollowingFound([
        '.qc-cmp2-summary-buttons button[aria-label="DISAGREE"]',
        fallbackSelector,
    ]);

    if (foundSelector === fallbackSelector) {
        // Ridiculously, sometimes one click is not enough.
        clickElement(foundSelector, true);
        
        log('Going through the settings page first');
        const rejectAllSelector = '.qc-cmp2-header-links button[aria-label="REJECT ALL"]';
        const saveAndExitSelector = '.qc-cmp2-footer button[aria-label="SAVE & EXIT"]';
        const potentialAgreeToSelectedSelector = '.qc-cmp2-buttons-desktop button[mode="secondary"]';

        const foundSelector2 = await untilOneOfFollowingFound([
            rejectAllSelector,
            potentialAgreeToSelectedSelector,
        ]);

        // Reject all if the option is found. If the config rewriter worked, this button is expected
        // to always be here.
        if (foundSelector2 === rejectAllSelector) {
            log('Found a "Reject all" button');
            clickElement(rejectAllSelector);
        }

        // Object all if the option is found
        if (clickElementIfTextMatches('.qc-cmp2-footer-links button:nth-child(2)', 'LEGITIMATE INTEREST', true)) {
            log('Going to the legitimate interest section');
            await untilStable(100);

            if (clickElementIfTextMatches('.qc-cmp2-header-links button:nth-child(1)', 'OBJECT ALL', true)) {
                log('Objected to all via top button');
            }
            else if (clickElementIfTextMatches('.qc-cmp2-buttons-desktop button[mode=secondary]', 'OBJECT ALL', true)) {
                log('Objected to all via bottom button');
            }
        }

        const foundSelector3 = await untilOneOfFollowingFound([
            saveAndExitSelector,
            potentialAgreeToSelectedSelector,
        ]);

        if (foundSelector3 === potentialAgreeToSelectedSelector) {
            if (!clickElementIfTextMatches(potentialAgreeToSelectedSelector, 'AGREE TO SELECTED')) {
                // Necessary when objecting to all via bottom button
                clickElementIfTextMatches('.qc-cmp2-buttons-desktop button[mode=primary]', 'SAVE & EXIT')
            }
        } else {
            clickElement(foundSelector3);
        }
    }
    log('Quantcast popup dismissed');
}

export default handle;