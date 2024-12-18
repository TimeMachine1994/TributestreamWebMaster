import { api } from '../apiHandler';
import dotenv from 'dotenv';
dotenv.config(); 
const BASE_WORDPRESS_API = process.env.BASE_WORDPRESS_API || 'http://localhost/wp-json';

interface RegistrationData {
    username: string;
    email: string;
    password: string;
    phone:  string;
}

interface RegistrationResponse {
    user_id: string;
    message: string;
}

export const registrationService = {
    async register(userData: RegistrationData) {
        return api.request<RegistrationResponse>(`${BASE_WORDPRESS_API}/wp-json/tributestream/v1/register`, {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
};
