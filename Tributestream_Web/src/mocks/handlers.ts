// **************************************************************
// ::Start of describing our network using handlers
// **************************************************************
// A request handler is responsible for intercepting a request 
// and handling its response, 
// **************************************************************

 import { http, HttpResponse } from 'msw'
  
 import { userHandlers } from './handlers-users.js'

const BASE_WORDPRESS_API = 'http://localhost/wp-json';
const MAIN_URL = 'http://localhost';
// **************************************************************
// ::Start the handlers array
// **************************************************************
// You can describe different APIs, like REST or GraphQL,
// including at the same time in the same handlers array. 
// **************************************************************
export const handlers = [

    http.get('/api/hero-details', () => {
        return HttpResponse.json({
            title: "Memorial Service",
            location: "St. Mary's Church",
            startTime: "2024-02-01T10:00:00",
            notes: "Please arrive 15 minutes early",
            paymentStatus: "confirmed"
        });
    }),
    
    http.get('/api/schedule', () => {
        return HttpResponse.json([{
            startTime: "2024-02-01T10:00:00",
            streamType: "Memorial Service",
            estDuration: "1 hour",
            location: "St. Mary's Church"
        }]);
    }),
    //Intercept POST that would normally register the user.

    http.post(
        `${BASE_WORDPRESS_API}/tributestream/v1/register`,
        async ({ request }) => {
            const userData = await request.json()
            
            // Log registration attempt
            console.log('Registration attempt with:', userData)
            
            return HttpResponse.json({
                user_id: '12345',
                message: 'User registered successfully'
            }, { status: 201 })
        }
    ),
    
    http.get(
        `${BASE_WORDPRESS_API}/tributestream/v1/tribute/:userId`,
        async ({ params }) => {
            const { slug } = params;
            console.log('Fetching tribute for slug:', slug);
            
            // Return the tribute data
            return HttpResponse.json({
                slug: slug,
                loved_one_name: "Test Name",
                // Add other tribute data fields here
            });
        }
    ),
    http.get(
        `${BASE_WORDPRESS_API}/tributestream/v1/tribute/:slug`,
        async ({ params }) => {
            const { slug } = params;
            console.log('Fetching tribute for slug:', slug);
            
            // Return the tribute data
            return HttpResponse.json({
                slug: slug,
                loved_one_name: "Test Name",
                // Add other tribute data fields here
            });
        }
    ),
     // Mock login endpoint
     http.post(`${BASE_WORDPRESS_API}/jwt-auth/v1/token`, async ({ request }) => {
        const { username, password } = await request.json();

        if (username === 'admin' && password === 'password') {
            return HttpResponse.json(
                {
                    success: true,
                    token: 'mock-jwt-token-123'
                },
                {
                    headers: {
                        'Set-Cookie': 'auth_token=mock-jwt-token-123; Path=/; HttpOnly; Secure; SameSite=Strict'
                    }
                }
            );
        }

        return HttpResponse.json(
            {
                success: false,
                message: 'Invalid credentials'
            },
            { status: 401 }
        );
    }),

    // Mock logout endpoint
    http.post(`${BASE_WORDPRESS_API}/jwt-auth/v1/logout`, () => {
        return HttpResponse.json(
            { success: true },
            {
                headers: {
                    'Set-Cookie': 'auth_token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict'
                }
            }
        );
    }),

    // Mock fetching current user details
    http.get(`${BASE_WORDPRESS_API}/wp/v2/users/me`, ({ request }) => {
        const authHeader = request.headers.get('Authorization');

        if (authHeader?.startsWith('Bearer ')) {
            return HttpResponse.json({
                id: 1,
                username: 'admin',
                name: 'Admin User'
            });
        }

        return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
        );
    }),

    // handle livestream cart update between pages 4 and 5. 
    http.post(
        `${BASE_WORDPRESS_API}/tributestream/v1/saveCart`, async ({ request }) => {
        const cartData = await request.json()
            console.log('Cart Data:', cartData)

            return HttpResponse.json({
                cart_id: '12345',
                message: 'Cart updated successfully'
            }, { status: 201 })
        } 
    ),
    //we will add a GET here later to load previous carts from the database if they have been accessed before. 

    http.get(
        `${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`, async ({ request }) => {
            //return json data from database via profile_id in family_poc_profiles table
            return HttpResponse.json({
                id: '1',
                phone: '1234567890',
                address: '123 Main St',
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00',
                incomplete_cart: '0',
            })
        }
    ),

    http.post(
        `${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`, async ({ request }) => {
            //return json data from database via profile_id in family_poc_profiles table
            return HttpResponse.json({
                "updateStatus": "success",
            })
        }
    ),
    ...userHandlers,



 ]
