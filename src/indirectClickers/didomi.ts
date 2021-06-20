import { attachPageScriptForClicker } from "../common";

async function handle() {
    // window.Didomi can only be interacted with by injecting code into
    // the real page
    attachPageScriptForClicker('didomi');
}

export default handle;