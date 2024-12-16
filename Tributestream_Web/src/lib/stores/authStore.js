import { writable } from 'svelte/store';

// Writable store to hold the JWT token
export const authToken = writable<string | null>(null);

// Utility functions for managing the token
export const setToken = (token: string) => {
    authToken.set(token);
};

export const clearToken = () => {
    authToken.set(null);
};
