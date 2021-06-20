import { clickAllWhenFound, clickWhenFound } from "../common";
import { log } from "../logger";

(async function() {
    const searchParams = new URLSearchParams(document.location.search);

    // Standalone variant where everything happens in an iframe
    if (document.location.pathname === '/' && searchParams.get('layout') === 'default_eu') {
        await clickWhenFound('.shp');

        // TrustArc's submit button is a little bit buggy. Sometimes it breaks and outputs
        // a stack trace in the console. Workaround: if at first you don't succeed, dust
        // yourself off and try again.
        let formCloseTries = 0;
        async function submitForm() {
            await clickWhenFound('.pdynamicbutton .submit');
            formCloseTries++;

            // The body turns itself invisible when the preferences have been submitted
            if (document.querySelector('body').style.display !== 'none') {
                if (formCloseTries < 10) {
                    setTimeout(submitForm, 50);
                } else {
                    log('Cookie popup may still be open due to vendor quirks')
                }
            }
        }
        submitForm();
        log('TrustArc popup handled');
    }
    // Variant that is initiated through Trustarc's indirect clicker which creates an
    // iframe we have to hook in to directly
    else if (document.location.pathname === '/' && searchParams.get('layout') === 'iab') {
        await clickWhenFound('.rejectAll');
    }
})();