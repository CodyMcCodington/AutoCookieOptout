import { clickElement, clickElementIfTextMatches, clickWhenFound, clickWhenOneOfFollowingFound, hasCookie, untilOneOfFollowingFound, untilStable } from "../common";
import { retryUntil } from "../common.pagescript";
import { log } from "../logger";

async function handle() {
    const moreOptionsSelector = '.qc-cmp2-summary-buttons button[mode=secondary]:nth-child(2)';

    // If a consent cookie is already present, hold on a little bit in case
    // the website is going to ask for permission again
    if (hasCookie('euconsent-v2')) {
        await untilStable(1000);
        if (!document.querySelector(moreOptionsSelector)) {
            log('Assuming already opted out of Quantcast');
            return;
        }
    }

    // Ignore the Disagree button as it doesn't object to legitimate interest
    await untilOneOfFollowingFound([moreOptionsSelector]);
    clickElementIfTextMatches(moreOptionsSelector, 'MORE OPTIONS');

    // Ridiculously, sometimes one click is not enough.
    clickElement(moreOptionsSelector, true);
    
    log('Going through the settings page first');   
    const partnersButtonSelector = '.qc-cmp2-footer-links button:nth-child(1)';
    await untilOneOfFollowingFound([partnersButtonSelector]);
    clickElementIfTextMatches(partnersButtonSelector, 'PARTNERS');
    log('Going to the partners section');
    await untilStable(100);
    clickElementIfTextMatches('.qc-cmp2-header-links button:nth-child(1)', 'REJECT ALL');
    log('Rejecting partners via top button');
    
    clickElementIfTextMatches('.qc-cmp2-footer-links button:nth-child(2)', 'LEGITIMATE INTEREST');
    log('Going to the legitimate interest section');
    await untilStable(100);
    clickElementIfTextMatches('.qc-cmp2-header-links button:nth-child(1)', 'OBJECT ALL');
    log('Objected to all via top button');
    
    const saveAndExitSelector = '.qc-cmp2-buttons-desktop button';
    await untilOneOfFollowingFound([saveAndExitSelector]);
    clickElementIfTextMatches(saveAndExitSelector, 'SAVE & EXIT');

    log('Quantcast popup dismissed');
}

export default handle;