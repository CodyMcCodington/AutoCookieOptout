import { attachPageScriptForClicker } from "../common";

async function handle() {
    // Optanon can only be interacted with by injecting code into
    // the real page
    attachPageScriptForClicker('cookiepro');
}

export default handle;