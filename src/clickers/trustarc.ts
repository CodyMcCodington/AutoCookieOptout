import { clickWhenFound } from "./common";

(async function() {
    if (document.location.pathname === '/') {
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
                    console.debug('Cookie popup may still be open due to vendor quirks')
                }
            }
        }
        submitForm();
        console.debug('TrustArc popup handled');
    }
})();