import { log } from "../logger";

declare var Optanon: {
    IsAlertBoxClosedAndValid: () => boolean;
    RejectAll: () => void;
} | undefined;

let injectionWaitTries = 0;
function waitForInjection() {
    if (typeof Optanon === 'undefined') {
        injectionWaitTries++;
        if (injectionWaitTries < 100) {
            log('Waiting for Optanon object injection');
            setTimeout(waitForInjection, 50);
        } else {
            log('Giving up waiting. Possible interference from other extensions.');
        }
    } else if (!Optanon.IsAlertBoxClosedAndValid()) {
        log('Consent does not seem to be registered yet');
        optout();
    } else {
        log('Assuming already opted out');
    }
}

function optout() {
    // Combine two CSS selectors to handle different implementations that are floating
    // around on the internet
    if (document.querySelector('#onetrust-button-group, .onetrust-close-btn-handler')) {
        log('Opting out at CookiePro');
        Optanon.RejectAll();

        // Due to a bug in CookiePro it does not always close properly.
        // Here is a workaround that also gets rid of the closing animation.
        document.body.style.overflow = null;
        document.querySelector('html').style.overflow = null;
        const consentSdkElement = document.querySelector('#onetrust-consent-sdk');
        if (consentSdkElement instanceof HTMLElement) {
            consentSdkElement.style.display = 'none';
            log('Hid OneTrust consent SDK');
        } else if (consentSdkElement) {
            throw new Error('Consent SDK element has incorrect type');
        }
    } else {
        log('Waiting for dialog');
        setTimeout(optout, 50);
    }
}

waitForInjection();