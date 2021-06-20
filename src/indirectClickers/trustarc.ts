import { clickWhenFound, hasEuConsentCookie } from "../common";

async function handle() {
    if (hasEuConsentCookie(document.cookie)) {
        console.debug('Assuming already opted out');
    } else {
        // This will trigger an iframe that is handled by the content script in the
        // direct clicker folder
        await clickWhenFound('.trustarc-manage-btn');
    }
}

export default handle;