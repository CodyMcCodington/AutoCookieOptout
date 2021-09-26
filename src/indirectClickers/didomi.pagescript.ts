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

        // Since we cannot reliably detect when a website will reprompt a user for which a consent
        // cookie was already set, signal the optout every time the page is loaded.
        log('Opting out');
        window.Didomi.setUserDisagreeToAll();
    } catch (error) {
        log(`Giving up waiting. Possible interference from other extensions. Inner error: ${error}`);
    }
}
optout();