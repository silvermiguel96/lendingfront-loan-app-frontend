export function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name: string) {
    return document.cookie.split('; ').reduce((res, cookie) => {
        const [key, val] = cookie.split('=');
        return key === name ? decodeURIComponent(val) : res;
    }, '');
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
