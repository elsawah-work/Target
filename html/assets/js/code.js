// JavaScript code to block unauthorized domains and prevent debugging tools
(function () {
    // Allowed domains
    const allowedDomains = ["example.com", "example.org", "example.net"];

    // Check if the current domain is allowed or running locally with explicit inclusion
    const currentDomain = window.location.hostname;
    const isLocal = window.location.protocol === "file:" && currentDomain === "";
    const isAllowed = allowedDomains.some(domain => currentDomain.includes(domain)) || isLocal;

    // Disable right-click globally
    window.oncontextmenu = function () {
        return false;
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, and Ctrl+F globally
    document.addEventListener("keydown", function (event) {
        if (
            event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && (event.code === "KeyI" || event.code === "KeyJ")) ||
            (event.ctrlKey && (event.code === "KeyU" || event.code === "KeyF" || event.code === "KeyG"))
        ) {
            event.preventDefault();
            return false;
        }
    }, true);

    // Disable functionality if the domain is not allowed
    if (!isAllowed) {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 20%; font-family: Arial, sans-serif;">
                <h1>Access Denied</h1>
                <p>This site is restricted to authorized domains only.</p>
                <button onclick="window.location.href='https://google.com'">Go to Google</button>
                <button onclick="window.location.href='https://bing.com'">Go to Bing</button>
                <button onclick="window.location.href='https://duckduckgo.com'">Go to DuckDuckGo</button>
            </div>
        `;

        return;
    }
})();
