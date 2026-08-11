const API = "https://airport-api-3ixj.onrender.com";

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