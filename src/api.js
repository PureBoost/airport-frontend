const API = "http://localhost:8080";

export async function apiFetch(url, options = {}) {

    const auth = localStorage.getItem("auth");

    return fetch(API + url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json"
        }
    });
}