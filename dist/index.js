export * from './cybershield.interceptor';
/**
 * Initializes CyberShield's global trap mechanism.
 * This sets up the history API trap and monkey-patches the global fetch API
 * to ensure that any request (even outside Angular's HttpClient) is intercepted.
 */
export function initCyberShield() {
    if (typeof window === 'undefined')
        return;
    // 1. Check if we are already in a trap state
    if (window.history.state && window.history.state.cybershield_trap) {
        window.location.replace(window.history.state.redirect_url);
        return;
    }
    // 2. Prevent user from navigating back into the app using browser history
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.cybershield_trap) {
            window.location.replace(event.state.redirect_url);
        }
    });
    // 3. Prevent multiple initializations
    if (window.__cybershield_initialized)
        return;
    window.__cybershield_initialized = true;
    // 4. Monkey-patch standard window.fetch just in case the app or a 3rd party lib uses it instead of HttpClient
    if (!window.fetch)
        return;
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        let [resource, config] = args;
        config = config || {};
        try {
            const response = await originalFetch(resource, config);
            if (response.status === 403 || response.status === 429) {
                const clonedResponse = response.clone();
                try {
                    const data = await clonedResponse.json();
                    if (data && data.blocked && data.redirect) {
                        window.history.replaceState({ cybershield_trap: true, redirect_url: data.redirect }, "");
                        window.location.assign(data.redirect);
                    }
                }
                catch (e) { }
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    };
}
// Automatically initialize the global trap when this file is imported
initCyberShield();
//# sourceMappingURL=index.js.map