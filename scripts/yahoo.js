if (document.location.pathname === '/v2/collectConsent') {
    // Page 1
    document.querySelector('.consent-form .btn[href^="/v2/partners"]').click();
} else if (document.location.pathname === '/v2/partners') {
    // Page 2
    document.querySelector('#select-legit-all-purpose').click(); // Toggle legitimate interest to off
    document.querySelector('[type=submit]').click();
}