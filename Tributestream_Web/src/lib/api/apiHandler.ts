// - /src/lib/server/api/apiHandler.ts

import { dev } from '$app/environment';

// Define the shape of all API responses for consistent typing
interface ApiResponse<T> {
    data?: T;                // The response data of type T
    error?: string;          // Error message if something goes wrong
    status: number;          // HTTP status code
}

export class ApiHandler {
    private baseUrl: string; // Base URL for all API requests

    constructor() {
        // Set base URL based on environment
        this.baseUrl = dev ? 'http://localhost' : 'https://tributestream.com';
    }

    // Generic request method for API calls
    async request<T>(
        endpoint: string,
        options: RequestInit = {},
        cookies?: { get: (name: string) => string | undefined } // Pass cookies as an argument
    ): Promise<ApiResponse<T>> {
        // Retrieve the token from cookies if provided
        const token = cookies?.get('auth_token');

        // Construct headers
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            // Make the API request
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include' // Ensure cookies are sent
            });

            // Parse JSON response
            const data = await response.json();

            return {
                data,
                status: response.status
            };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                status: 500
            };
        }
    }
}

// Export a singleton instance for use throughout the application
export const api = new ApiHandler();
