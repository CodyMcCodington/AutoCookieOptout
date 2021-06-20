import { clickWhenFound } from "../common";

(async function() {
    if (document.cookie === '') {
        await clickWhenFound('.aOOlW.HoLwm');
        await clickWhenFound('.aOOlW.bIiDR');
        console.debug('Instagram popup dismissed');
    } else {
        console.debug('Cookies have been set, assuming already opted out');
    }
})();