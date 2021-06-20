import { clickWhenFound, hasEuConsentCookie } from "../common";

async function handle() {
    if (hasEuConsentCookie(document.cookie)) {
        console.debug('Assuming already opted out');
    } else {
        await clickWhenFound('.qc-cmp2-summary-buttons button[mode=secondary]');
        await clickWhenFound('.qc-cmp2-header-links button[aria-label="REJECT ALL"]');
        await clickWhenFound('.qc-cmp2-footer button[aria-label="SAVE & EXIT"]');
    }
}

export default handle;