import { attachScriptToBodyLoad } from "../common";

async function handle() {
    // It looks like window.Didomi cannot be interacted with from content scripts, so
    // inject a script tag into the page instead
    const scriptTag = document.createElement('script');
    scriptTag.text = `
        let injectionWaitTries = 0;
        function optout() {
            if (typeof window.Didomi !== 'undefined' || document.querySelector('#didomi-popup')) {
                if (window.Didomi.getUserStatus().purposes.consent.disabled.length === 0) {
                    console.debug('Opting out');
                    window.Didomi.setUserDisagreeToAll();
                } else {
                    console.debug('Assuming already opted out');
                }
            } else {
                injectionWaitTries++;
                if (injectionWaitTries < 100) {
                    console.debug('Wait for window.Didomi or dialog to appear');
                    setTimeout(optout, 50);
                } else {
                    console.debug('Giving up waiting. Possible interference from other extensions.');
                }
            }
        }
        optout();
    `;
    attachScriptToBodyLoad(scriptTag);
}

export default handle;