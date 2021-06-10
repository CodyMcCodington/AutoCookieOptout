declare namespace Optanon {
    function RejectAll(): void;
};

async function handle() {
    // It looks like we cannot access CookiePro directly from the content script, so
    // inject a script tag into the page instead
    const scriptTag = document.createElement('script');
    scriptTag.text = `
        let injectionWaitTries = 0;
        function waitForInjection() {
            if (typeof Optanon === 'undefined') {
                injectionWaitTries++;
                if (injectionWaitTries < 100) {
                    console.debug('Waiting for Optanon object injection');
                    setTimeout(waitForInjection, 50);
                } else {
                    console.debug('Giving up waiting. Possible interference from other extensions.');
                }
            } else if (!Optanon.IsAlertBoxClosedAndValid()) {
                console.debug('Consent does not seem to be registered yet');
                optout();
            } else {
                console.debug('Assuming already opted out');
            }
        }

        function optout() {
            // Combine two CSS selectors to handle different implementations that are floating
            // around on the internet
            if (document.querySelector('#onetrust-button-group, .onetrust-close-btn-handler')) {
                console.debug('Opting out at CookiePro');
                Optanon.RejectAll();

                // Due to a bug in CookiePro it does not always close properly.
                // Here is a workaround that also gets rid of the closing animation.
                document.body.style.overflow = null;
                document.querySelector('html').style.overflow = null;
                document.querySelector('#onetrust-consent-sdk').style.display = 'none';
            } else {
                console.debug('Waiting for dialog');
                setTimeout(optout, 50);
            }
        }

        waitForInjection();
    `;
    document.body.appendChild(scriptTag);
}

export default handle;