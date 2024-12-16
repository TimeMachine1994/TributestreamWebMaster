// src/lib/services/authStore.ts
import { writable } from 'svelte/store';
import { postToken, postTokenValidate, getUsersMe } from '$lib/api';
import { goto } from '$app/navigation';

interface User {
    id: number;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    roles: string[];
}


interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: User | null;
    hasCompletedCalculator: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: null,
    hasCompletedCalculator: false,
};


function createAuthStore() {
    const { subscribe, set, update } = writable(initialState);

    return {
        subscribe,
        login: async (username: string, password: string) => {
            try {
                const tokenResponse = await postToken({ username, password });

                if (tokenResponse && tokenResponse.token) {
                     localStorage.setItem('authToken', tokenResponse.token);
                    const validationResponse = await postTokenValidate({token: tokenResponse.token});
                     if (validationResponse && validationResponse.code === 'jwt_auth_valid_token') {
                           const userResponse = await getUsersMe()
                            if (userResponse) {
                                set({
                                    isLoggedIn: true,
                                     token: tokenResponse.token,
                                    user: userResponse,
                                     hasCompletedCalculator: false
                                });
                                return;
                            }
                        }
                     }
                     throw new Error('Invalid Credentials');
            } catch (error:any) {
                   localStorage.removeItem('authToken');
                set({ ...initialState});
                throw new Error(error.message);
            }
        },
          checkAuthStatus: async () => {
                const token = localStorage.getItem('authToken')
                if (token) {
                     try {
                        const validationResponse = await postTokenValidate({token});
                          if (validationResponse && validationResponse.code === 'jwt_auth_valid_token') {
                             const userResponse = await getUsersMe()
                                if (userResponse) {
                                    set({
                                        isLoggedIn: true,
                                        token: token,
                                        user: userResponse,
                                        hasCompletedCalculator: false,
                                    });
                                }
                           } else {
                                 localStorage.removeItem('authToken');
                                 set({...initialState});
                           }
                     } catch (e) {
                        localStorage.removeItem('authToken');
                         set({...initialState});
                    }
               }
        },
          handleInitialRedirect: () => {
            if (localStorage.getItem('authToken')) {
                if (false) {
                    goto('/family-dashboard');
                } else {
                    goto('/calculator');
                }
            }
        },
        logout: () => {
             localStorage.removeItem('authToken');
                set({...initialState});
            goto('/');
        },
    };
}

export const authStore = createAuthStore();