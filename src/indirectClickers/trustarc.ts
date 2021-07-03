import { clickWhenFound } from "../common";

async function handle() {
    // Plan A: hit the button that opts out of non-required cookies, if present
    // Plan B: walk through the settings screen. Here's how:
    //  - Click the relevant DOM element
    //  - This should open an iframe
    //  - The iframe load triggers our direct clicker for TrustArc 
    await clickWhenFound('#truste-consent-required, .trustarc-manage-btn');
}

export default handle;