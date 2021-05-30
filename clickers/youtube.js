if (document.location.pathname === '/m') {
    // Page 1
    document.querySelector('a[href^="https://consent.youtube.com/d?"]').click();
} else if (document.location.pathname === '/d') {
    // Page 2
    document.querySelector('[jsname=yUNjVb]').click();
    document.querySelector('[jsname=FXYDXd]').click();
    document.querySelector('[jsname=SHqtNc]').click();
    document.querySelector('form').submit();
}