import { retryUntil } from "../common.pagescript";
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
async function optout() {
    try {
        log('Waiting until Didomi is present');
        await retryUntil(() => !!window.Didomi, 50, 100);
        if (window.Didomi.getUserStatus().purposes.consent.disabled.length === 0) {
            log('Opting out');
            window.Didomi.setUserDisagreeToAll();
        } else {
            log('Assuming already opted out');
        }
    } catch (error) {
        log(`Giving up waiting. Possible interference from other extensions. Inner error: ${error}`);
    }
}
optout();