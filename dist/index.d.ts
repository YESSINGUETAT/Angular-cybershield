export * from './cybershield.interceptor';
/**
 * Initializes CyberShield's global trap mechanism.
 * This sets up the history API trap and monkey-patches the global fetch API
 * to ensure that any request (even outside Angular's HttpClient) is intercepted.
 */
export declare function initCyberShield(): void;
//# sourceMappingURL=index.d.ts.map