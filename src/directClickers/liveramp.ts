import { clickAllElements, clickWhenFound } from "../common";

(async function() {
    await clickWhenFound('button#manageSettings');
    clickAllElements('.items [aria-checked=true]')
    await clickWhenFound('button#saveAndExit');

    // Some websites require you to confirm saving your settings if you don't opt in to everything
    clickAllElements('.confirmation-dialog .okButton');
})();