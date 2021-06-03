import { clickAllWhenFound, clickWhenFound } from "./common";

async function handle() {
    await clickAllWhenFound('input.CybotCookiebotDialogBodyLevelButton:checked:not(:disabled)');
    await clickWhenFound('#CybotCookiebotDialogBodyLevelButtonAccept');
}

export default handle;