import { log } from "../logger";

export {};

declare global {
    interface Window {
        Didomi?: {
            getUserStatus: () => any,
            setUserDisagreeToAll: () => void,
        };
    }
}

let injectionWaitTries = 0;
function optout() {
    if (typeof window.Didomi !== 'undefined' || document.querySelector('#didomi-popup')) {
        if (window.Didomi.getUserStatus().purposes.consent.disabled.length === 0) {
            log('Opting out');
            window.Didomi.setUserDisagreeToAll();
        } else {
            log('Assuming already opted out');
        }
    } else {
        injectionWaitTries++;
        if (injectionWaitTries < 100) {
            log('Wait for window.Didomi or dialog to appear');
            setTimeout(optout, 50);
        } else {
            log('Giving up waiting. Possible interference from other extensions.');
        }
    }
}
optout();