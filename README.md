# Auto Cookie Optout

You have the right to choose which cookies you're okay with. If your choice is "as little as possible", Auto Cookie Optout can opt you out of optional cookies on supported websites.

Traditional content blockers may cause the following problems when blocking cookie popups:
- Leftovers of cookie popups
- The scroll bar of the website being gone
- Site features acting strangely because they're waiting for the result of the cookie consent process

ACO's approach differs from those content blockers in that it actively signals the website that you don't consent to optional cookies. With Auto Cookie Optout, sites should behave the same as when you manually opt out in the popup.

## How to install
- [Download at Mozilla Addons](https://addons.mozilla.org/en-US/firefox/addon/auto-cookie-optout/).
- Older versions may still be available from the Releases section for sideloading
- Have any content blockers installed?
  - uBlock Origin: you may want to install the [filter list](https://raw.githubusercontent.com/CodyMcCodington/AutoCookieOptout/main/compatibilityList.txt) for compatibility with its default settings.
  - If you customized your configuration or use another content blocker, you may need to adjust your settings to ensure Auto Cookie Optout can communicate with cookie popups and register your optout.

## How to build
- In root folder: `yarn`, then `yarn build`
- Under `dist/webext-prod`, run `web-ext build`

## Questions

### Can't I just install uBlock Origin to get rid of cookie popups?
uBO is a very capable tool. But for cookie popups, it may not provide the best experience. Even though it can hide them and prevent the load of scripts that trigger a cookie popup, it may cause issues such as:

- Website features getting stuck in a partially loaded state (because they're awaiting the outcome of the cookie consent process)
- Residuals of the cookie popup sticking around (mainly disabled scroll bars, dark page overlays)

Auto Cookie Optout will explicitly signal to the website that you want to opt out of optional cookies, which should provide a more seamless experience. It's also a hint to websites that privacy matters to you.

### Which sites do you support?
Non-exhaustive list of supported websites:

- Websites with cookie consent plugins from common vendors like TrustArc, Didomi and CookieBot
- Various Google properties including web search, Google Maps and YouTube (including some regional variations)
- Yahoo and affiliated websites like TechCrunch

### Why does the extension need permission to run on all websites?
We don't have a full list of every domain name we support. If you're on a website that happens to use a compatible third-party cookie consent vendor, the plugin will detect it and take action. We've open sourced the extension so you can verify that we use this permission responsibly. If you want to compare a local build to packed versions of the extension, our build script is `yarn build`.

### Is it normal that I still see popups for a split second?
Yes. We're thinking about how to improve UX in the future. In some cases we may be able to prevent that by proactively injecting some CSS. With hard walls like YouTube's, we could show a loading placeholder. Maybe we will have a setting to make this behavior optional.

### Is this legal?
ACO is a tool to automatically excercise your right to opt out of optional cookies. GDPR and similar legislation across the world give you that optout right. Unlike other legal extensions like uBlock Origin, ACO doesn't attempt to block ads. Maybe someday there will be a standardized optout system on browser level that every website uses. That would make a one-time universal optout a lot easier. Until then, we're happy to help.

## Disclaimer and other legal stuff
Use this plugin at your own risk. We do not accept any form of liability, including but not limited to you accidentally opting in to cookies you did not want. Scripts may break from time to time when websites update their cookie walls. If you find a bug in one of our scripts, you can open a new issue ticket.