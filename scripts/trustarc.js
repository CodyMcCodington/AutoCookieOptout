// Move this to a utilities file as soon as we use it elsewhere
function clickWhenFound(selector) {
    return new Promise((resolve) => {
        function clickAndResolve() {
            const element = document.querySelector(selector);
            if (element) {
                element.click();
                resolve();
                return;
            }
            setTimeout(clickAndResolve, 50);
        }
        clickAndResolve();
    });
}

async function main() {
    if (document.location.pathname === '/') {
        await clickWhenFound('.shp');

        // TrustArc's submit button is a little bit buggy. Sometimes it breaks and outputs
        // a stack trace in the console. Workaround: if at first you don't succeed, dust
        // yourself off and try again.
        async function submitForm() {
            await clickWhenFound('.pdynamicbutton .submit');

             // The body turns itself invisible when the preferences have been submitted
             if (document.querySelector('body').style.display !== 'none') {
                setTimeout(submitForm, 50);
            }
        }
        submitForm();
    }
}

main();