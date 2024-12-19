import type { LayoutServerLoad } from './$types';

const mockFamilyProfiles = [
    {
        id: 1,
        name: "John Doe",
        phoneNumber: "555-0123",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        phoneNumber: "555-0124",
        email: "jane@example.com"
    }
];

const mockLivestreams = [
    {
        id: 1,
        livestreamTime: "2024-02-20 14:00",
        livestreamLocation: "Memorial Chapel",
        status: "scheduled"
    },
    {
        id: 2,
        livestreamTime: "2024-02-22 15:30",
        livestreamLocation: "Riverside Cemetery",
        status: "pending"
    }
];

export const load: LayoutServerLoad = async ({ cookies }) => {
    const authToken = cookies.get('auth_token');
    
    if (!authToken) {
        return {
            redirect: '/login'
        };
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    
    const dashboardData = {
        familyProfiles: mockFamilyProfiles,
        userLivestreams: mockLivestreams,
        user: {
            isOnboarded: true
        }
    };

    return {
        success: true,
        dashboardData
    };
};
