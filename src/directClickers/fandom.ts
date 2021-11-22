import { clickWhenFound, hasCookie, untilStable } from "../common";
import { log } from "../logger";

(async function() {
    const learnMoreSelector = '[data-tracking-opt-in-learn-more=true]';

    // If a consent cookie is already present, hold on a little bit in case
    // the website is going to ask for permission again
    if (hasCookie('euconsent-v2')) {
        await untilStable(1000);
        if (!document.querySelector(learnMoreSelector)) {
            log('Assuming already opted out at Fandom');
            return;
        }
    }

    await clickWhenFound(learnMoreSelector);
    log('Now on the options screen');
    // Fandom toggles everything off by default at this point
    await clickWhenFound('[data-tracking-opt-in-save=true]');
})();