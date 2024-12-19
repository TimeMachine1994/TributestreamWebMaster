import type { Actions } from './$types';
import { dashboardStore } from '$lib/stores/dashboardStore';
import { get } from 'svelte/store';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (username === 'admin' && password === 'password') {
            cookies.set('auth_token', 'mock_token', { path: '/' });
            
            const storeData = get(dashboardStore);
            const redirectPath = storeData.hasVisitedCalculator ? '/dashboard' : '/calculator';

            return {
                success: true,
                redirect: redirectPath
            };
        }

        return {
            success: false,
            message: 'Invalid credentials'
        };
    }
} satisfies Actions;
