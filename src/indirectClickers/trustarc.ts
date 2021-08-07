import { clickWhenOneOfFollowingFound, hasCookie } from "../common";
import { log } from "../logger";

async function handle() {
    if (hasCookie('notice_gdpr_prefs')) {
        log('TrustArc-specific cookie found, assuming already opted out');
        return;
    }

    // Plan A: hit the button that opts out of non-required cookies, if present
    // Plan B: walk through the settings screen. Here's how:
    //  - Click the relevant DOM element
    //  - This should open an iframe
    //  - The iframe load triggers our direct clicker for TrustArc
    await clickWhenOneOfFollowingFound(['#truste-consent-required', '.trustarc-manage-btn']);
}

export default handle;