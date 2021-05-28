if (document.location.pathname === '/m') {
    // Page 1
    document.querySelector('a[aria-label="Customize"]').click();
} else if (document.location.pathname === '/d') {
    // Page 2
    document.querySelector('button[aria-label="Turn off Search customization"]').click();
    document.querySelector('button[aria-label="Turn off YouTube History"]').click();
    document.querySelector('button[aria-label="Turn off Ad personalization"]').click();
    document.querySelector('form').submit();
}