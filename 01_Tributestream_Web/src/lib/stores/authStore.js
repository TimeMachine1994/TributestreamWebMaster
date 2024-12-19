import { writable } from 'svelte/store';


const browser = typeof window !== 'undefined';

const initialUserState = {
    isLoggedIn: browser ? !!localStorage.getItem('jwtToken') : false,
    token: browser ? localStorage.getItem('jwtToken') || '' : '',
    userInfo: browser ? JSON.parse(localStorage.getItem('userInfo') || 'null') || {
        id: null,
        email: '',
        displayName: '',
        userLogin: '',
        userUrl: '',
        userRegistered: '',
    } : {
        id: null,
        email: '',
        displayName: '',
        userLogin: '',
        userUrl: '',
        userRegistered: '',
    }
};

export const userStore = writable(initialUserState);

export function login(token, userData) {
    const userState = {
        isLoggedIn: true,
        token: token,
        userInfo: {
            id: userData.ID,
            email: userData.user_email,
            displayName: userData.display_name,
            userLogin: userData.user_login,
            userUrl: userData.user_url,
            userRegistered: userData.user_registered
        }
    };
    
    userStore.set(userState);
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userInfo', JSON.stringify(userState.userInfo));
}

export function logout() {
    userStore.set({
        isLoggedIn: false,
        token: '',
        userInfo: {
            id: null,
            email: '',
            displayName: '',
            userLogin: '',
            userUrl: '',
            userRegistered: '',
        }
    });
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
}

export function updateUserInfo(newUserData) {
    userStore.update(state => ({
        ...state,
        userInfo: { ...state.userInfo, ...newUserData }
    }));
    localStorage.setItem('userInfo', JSON.stringify(newUserData));
}
