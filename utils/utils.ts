export function getURL(window: Window): string {
    return window.location.protocol + "//" + window.location.href;
}