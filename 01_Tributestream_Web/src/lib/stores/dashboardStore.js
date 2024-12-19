import { writable } from 'svelte/store';

export const dashboardStore = writable({
    familyProfiles: [],
    userLivestreams: [],
    user: null,
    hasVisitedCalculator: false
});

export const updateDashboardData = (data) => {
    dashboardStore.set({...data, hasVisitedCalculator: false});
};

export const setCalculatorVisited = () => {
    dashboardStore.update(state => ({...state, hasVisitedCalculator: true}));
};
