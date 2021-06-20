import { clickElement } from "../common";

if (document.location.pathname === '/v2/collectConsent') {
    // Page 1
    clickElement('.consent-form .btn[href^="/v2/partners"]');
} else if (document.location.pathname === '/v2/partners') {
    // Page 2
    clickElement('#select-legit-all-purpose'); // Toggle legitimate interest to off
    clickElement('[type=submit]');
}