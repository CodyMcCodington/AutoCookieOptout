import { clickWhenFound, retryUntil } from "../common";

(async function() {
    if (document.cookie.match(/OptanonConsent=/)) {
        console.debug('Assuming already opted out');
    } else if (window.location.hostname === 'stackexchange.com') {
        console.debug('No further action needed on the central site');
    } else {
        await clickWhenFound('.js-cookie-settings');

        console.debug('Waiting for the regular CookiePro handler to kick in');
        await retryUntil(() => {
            console.debug(document.cookie);
            return !!document.cookie.match(/OptanonConsent=/);
        }, 10);
        await clickWhenFound('.js-consent-save');
        console.debug('Stack Exchange popup handled');

        const bannerSdkElement = document.querySelector('#onetrust-banner-sdk');
        if (bannerSdkElement) {
            console.debug('Stack Exchange did not close popup, forcing removal');
            bannerSdkElement.remove();
        }
    }
})();