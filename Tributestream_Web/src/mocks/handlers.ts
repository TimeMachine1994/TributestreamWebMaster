// **************************************************************
// ::Start of describing our network using handlers
// **************************************************************
// A request handler is responsible for intercepting a request 
// and handling its response, 
// **************************************************************

 import { http, HttpResponse } from 'msw'
 
const BASE_WORDPRESS_API = 'http://localhost/wp-json';
const MAIN_URL = 'http://localhost';
// **************************************************************
// ::Start the handlers array
// **************************************************************
// You can describe different APIs, like REST or GraphQL,
// including at the same time in the same handlers array. 
// **************************************************************
export const handlers = [

 // CRUD handlers for wpa2_tributes
 http.get(`${BASE_WORDPRESS_API}/tributes`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        user_id: 1,
        loved_one_name: 'John Doe',
        slug: 'john-doe',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        custom_html: '<p>Custom HTML</p>',
        phone_number: '123-456-7890',
      },
    ]);
  }),

  http.post(`${BASE_WORDPRESS_API}/tributes`, async ({ request }) => {
    const tribute = await request.json();
    return HttpResponse.json({ ...tribute, id: 2 }, { status: 201 });
  }),

  http.put(`${BASE_WORDPRESS_API}/tributes/:id`, async ({ params, request }) => {
    const tribute = await request.json();
    return HttpResponse.json({ ...tribute, id: params.id });
  }),

  http.delete(`${BASE_WORDPRESS_API}/tributes/:id`, async ({ params }) => {
    return HttpResponse.json({ message: `Tribute with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_events
  http.get(`${BASE_WORDPRESS_API}/tribute-events`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        tribute_id: 1,
        event_name: 'Memorial Service',
        event_date: '2023-01-10',
        event_location: 'Church',
        event_description: 'A memorial service for John Doe',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
      },
    ]);
  }),

  http.post(`${BASE_WORDPRESS_API}/tribute-events`, async ({ request }) => {
    const event = await request.json();
    return HttpResponse.json({ ...event, id: 2 }, { status: 201 });
  }),

  http.put(`${BASE_WORDPRESS_API}/tribute-events/:id`, async ({ params, request }) => {
    const event = await request.json();
    return HttpResponse.json({ ...event, id: params.id });
  }),

  http.delete(`${BASE_WORDPRESS_API}/tribute-events/:id`, async ({ params }) => {
    return HttpResponse.json({ message: `Event with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_pages
  http.get(`${BASE_WORDPRESS_API}/tribute-pages`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        tribute_title: 'John Doe Tribute',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        livestream_url: 'http://example.com/livestream',
        user_id: 1,
        page_status: 'active',
      },
    ]);
  }),

  http.post(`${BASE_WORDPRESS_API}/tribute-pages`, async ({ request }) => {
    const page = await request.json();
    return HttpResponse.json({ ...page, id: 2 }, { status: 201 });
  }),

  http.put(`${BASE_WORDPRESS_API}/tribute-pages/:id`, async ({ params, request }) => {
    const page = await request.json();
    return HttpResponse.json({ ...page, id: params.id });
  }),

  http.delete(`${BASE_WORDPRESS_API}/tribute-pages/:id`, async ({ params }) => {
    return HttpResponse.json({ message: `Page with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_streams
  http.get(`${BASE_WORDPRESS_API}/tribute-streams`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        page_id: 1,
        stream_status: 'live',
        stream_type: 'video',
        start_time: '2023-01-01T10:00:00Z',
        end_time: '2023-01-01T12:00:00Z',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        stream_order: 1,
        stream_title: 'John Doe Memorial',
        stream_url: 'http://example.com/stream',
      },
    ]);
  }),

  http.post(`${BASE_WORDPRESS_API}/tribute-streams`, async ({ request }) => {
    const stream = await request.json();
    return HttpResponse.json({ ...stream, id: 2 }, { status: 201 });
  }),

  http.put(`${BASE_WORDPRESS_API}/tribute-streams/:id`, async ({ params, request }) => {
    const stream = await request.json();
    return HttpResponse.json({ ...stream, id: params.id });
  }),

  http.delete(`${BASE_WORDPRESS_API}/tribute-streams/:id`, async ({ params }) => {
    return HttpResponse.json({ message: `Stream with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_users
  http.get(`${BASE_WORDPRESS_API}/users`, async () => {
    return HttpResponse.json([
      {
        ID: 1,
        user_login: 'admin',
        user_pass: 'password',
        user_email: 'admin@example.com',
        user_nicename: 'admin',
        user_url: 'http://example.com',
        user_registered: '2023-01-01',
        user_activation_key: '',
        user_status: 0,
        display_name: 'Admin User',
      },
    ]);
  }),

  // CRUD handlers for wpa2_family_poc_profile
  http.get(`${BASE_WORDPRESS_API}/family-poc-profiles`, async () => {
    return HttpResponse.json([
      {
        id: 1,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        created_at: '2023-01-01',
        updated_at: '2023-01-02',
        user_id: 1,
      },
    ]);
  }),

  http.post(`${BASE_WORDPRESS_API}/family-poc-profiles`, async ({ request }) => {
    const profile = await request.json();
    return HttpResponse.json({ ...profile, id: 2 }, { status: 201 });
  }),

  http.put(`${BASE_WORDPRESS_API}/family-poc-profiles/:id`, async ({ params, request }) => {
    const profile = await request.json();
    return HttpResponse.json({ ...profile, id: params.id });
  }),

  http.delete(`${BASE_WORDPRESS_API}/family-poc-profiles/:id`, async ({ params }) => {
    return HttpResponse.json({ message: `Profile with ID ${params.id} deleted` });
  }),


  //// CRUD handlers for wpa2_tribute_pages 


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
        '${BASE_WORDPRESS_API}/tributestream/v1/tribute/:userId',
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
    
    //Intercept POST that would normally create the tribute page.
    http.post(
        `${BASE_WORDPRESS_API}/tributestream/v1/tribute`, 
        async ({ request }) => {
            const requestData = await request.json()
            console.log('User ID:', requestData.user_id)
            console.log('Loved One Name:', requestData.loved_one_name)
            console.log('Slug:', requestData.slug)
            
            return HttpResponse.json(requestData)
    }),

    // JWT Token Generation
    http.post(`${BASE_WORDPRESS_API}/jwt-auth/v1/token`, async ({ request }) => {
        const credentials = await request.json()
        
        if (credentials.username === 'admin' && credentials.password === 'password') {
            return HttpResponse.json({
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.example.token',
                user_display_name: 'admin',
                user_email: 'admin@localhost.dev',
                user_nicename: 'admin'
            })
        }

        return HttpResponse.json({
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.example.token',
            user_display_name: 'admin',
            user_email: 'admin@localhost.dev',
            user_nicename: 'admin',
        }, )
    }),

    // JWT Token Validation
    http.post(`${BASE_WORDPRESS_API}/jwt-auth/v1/token/validate`, async ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        
        if (authHeader?.startsWith('Bearer ')) {
            return HttpResponse.json({
                code: 'jwt_auth_valid_token',
                data: { status: 200 }
            })
        }

        return HttpResponse.json({



            code: 'jwt_auth_invalid_token',
            message: 'Signature verification failed',
            data: { status: 403 }
        }, )
    }),

// intercept GET reqeusts to the Wordpress API
    http.get(
        `${BASE_WORDPRESS_API}/wp/v2/users/me`, async ({ request }) => {
        const authHeader = request.headers.get('Authorization')

        if (authHeader?.startsWith('Bearer ')) {
            return HttpResponse.json({
                "id": 1,
                "username": "admin",
                "name": "Admin User",
                "first_name": "Admin",
                "last_name": "User",
                "email": "admin@example.com",
                "url": "",
                "description": "",
                "link": "https://yourwebsite.com/author/admin",
                "slug": "admin",
                "roles": ["administrator"],
            })
        }
    }
),

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

//     http.get(
//         `${MAIN_URL}/src/routes/celebration-of-life-for-:slug/+page.js`,
//         async ({ params }) => {
//             const { slug } = params
            
//             return HttpResponse.json({
//                 props: {
//                     slug: slug,
//                     pageTitle: `Celebration of Life for ${slug}`,
//                     // Add any other data you want to pass to the page
//                 }
//             })
//         }
//     )
    

 ]
