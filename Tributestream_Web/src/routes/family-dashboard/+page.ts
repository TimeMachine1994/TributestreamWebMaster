import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const heroDetailsResponse = await fetch('/api/hero-details');
    const scheduleResponse = await fetch('/api/schedule');
    
    const heroDetails = await heroDetailsResponse.json();
    const scheduleData = await scheduleResponse.json();
    
    return {
        heroDetails,
        scheduleData
    };
};
