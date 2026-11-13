/** sessionStorage key set by the language picker: the next page skips the intro curtain. */
export const SKIP_INTRO_KEY = "luma:skip-intro";

/** CSS that removes the curtain and lets the Hero entrance run (used when the intro is skipped). */
const SKIP_CSS = "[data-intro-overlay]{display:none!important}[data-intro-wait] *,[data-intro-wait] *::after{animation-play-state:running!important}";

/** Safety net: if the app never starts (JS failed to load), the page is released after this. */
const FAILSAFE_MS = 6000;

/**
 * Inline script that runs before first paint (see app/[locale]/layout.tsx). It never touches
 * React-managed elements: it only appends its own <style> to <head> when
 * - the visitor just switched language (no curtain replay), or
 * - the intro is still "playing" after FAILSAFE_MS (the app failed to start),
 * so the curtain can neither flash on a language switch nor stay frozen on screen.
 */
export const introScript = `try{var k=${JSON.stringify(SKIP_INTRO_KEY)},c=${JSON.stringify(SKIP_CSS)},a=function(){var e=document.createElement("style");e.textContent=c;document.head.appendChild(e)};if(sessionStorage.getItem(k))a();setTimeout(function(){if(document.querySelector('[data-intro="playing"]'))a()},${FAILSAFE_MS})}catch(e){}`;

/** CSS for visitors without JavaScript: no curtain, Hero entrance runs as usual. */
export const introNoScriptCss = SKIP_CSS;
