import { api } from '../apiHandler';
import dotenv from 'dotenv';
dotenv.config(); 
const BASE_WORDPRESS_API = process.env.BASE_WORDPRESS_API || 'http://localhost/wp-json';

interface TributeData {
    user_id: string;
    loved_one_name: string;
    slug: string;
}

interface TributeResponse {
    user_id: string;
    loved_one_name: string;
    slug: string;
}

export const tributeService = {
    async createTribute(tributeData: TributeData) {
        return api.request<TributeResponse>(`${BASE_WORDPRESS_API}/wp-json/tributestream/v1/tribute`, {
            method: 'POST',
            body: JSON.stringify(tributeData)
        });
    }
};
