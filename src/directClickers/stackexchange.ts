import { clickWhenFound, retryUntil } from "../common";
import { log } from "../logger";

(async function() {
    if (document.cookie.match(/OptanonConsent=/)) {
        log('Assuming already opted out');
    } else if (window.location.hostname === 'stackexchange.com') {
        log('No further action needed on the central site');
    } else {
        await clickWhenFound('.js-cookie-settings');

        log('Waiting for the regular CookiePro handler to kick in');
        await retryUntil(() => {
            log(document.cookie);
            return !!document.cookie.match(/OptanonConsent=/);
        }, 10);
        await clickWhenFound('.js-consent-save');
        log('Stack Exchange popup handled');

        const bannerSdkElement = document.querySelector('#onetrust-banner-sdk');
        if (bannerSdkElement) {
            log('Stack Exchange did not close popup, forcing removal');
            bannerSdkElement.remove();
        }
    }
})();