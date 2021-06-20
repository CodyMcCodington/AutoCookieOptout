import { clickWhenFound } from "../common";

async function handle() {
    // This will trigger an iframe that is handled by the content script in the
    // direct clicker folder
    await clickWhenFound('.trustarc-manage-btn');
}

export default handle;