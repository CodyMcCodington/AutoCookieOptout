import { clickWhenFound } from "../common";
import { log } from "../logger";

(async function() {
    if (document.cookie === '') {
        await clickWhenFound('.aOOlW.HoLwm');
        await clickWhenFound('.aOOlW.bIiDR');
        log('Instagram popup dismissed');
    } else {
        log('Cookies have been set, assuming already opted out');
    }
})();