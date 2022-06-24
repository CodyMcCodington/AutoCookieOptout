import { clearSetting, clickAllWhenFound, clickElement, clickWhenFound, readFromStorage, writeToStorage, untilStableOrCondition } from "../common";
import { log } from "../logger";

// The flow:
// - Cookie popup shows up somewhere => save where we came from, open cookie settings
// - In cookie settings, opt out and submit
// - When the user is sent to the homepage, restore original page
(async () => {
    if (window.location.pathname === '/cookieprefs') {
        log('On cookie preferences page');

        const returnLink = await readFromStorage('previousAmazonPage');
        if (returnLink) {
            log('Optout seems in progress, updating settings...');
            await clickAllWhenFound('form[method=post] .a-radio input[value=off]');
            await clickWhenFound('form[method=post] input[aria-labelledby=savePrefs-announce]');
        } else {
            log('No automated optout is in progress');
        }
    } else {
        const returnLink = await readFromStorage('previousAmazonPage');
        if (returnLink) {
            // Amazon sends user to homepage after submitting cookie settings. restore initial page
            log('Navigating back to where you came from...');
            await clearSetting('previousAmazonPage');
            window.location.href = returnLink;
        }

        const customizeSelector = 'form[action^="/privacyprefs"] #sp-cc-customize';
        async function cookiePopupPresent() {
            return !!document.querySelector(customizeSelector);
        }

        // Amazon's DOM tend to changes a lot after page load so make attention
        await untilStableOrCondition(400, cookiePopupPresent);
        if (await cookiePopupPresent()) {
            await writeToStorage('previousAmazonPage', window.location.href);
            clickElement(customizeSelector);
        } else {
            log('Assuming already opted out');
        }
    }
})();