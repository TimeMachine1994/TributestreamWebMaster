// File: src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import { userHandlers } from './handlers-users.js'

const BASE_WORDPRESS_API = 'http://localhost/wp-json';
//********************************************************
// Define all mock data first
//********************************************************
const mockTributes = [
  {
    id: 1,
    user_id: 1,
    loved_one_name: "Marie Marie Marie",
    slug: "marie-marie-marie",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
    custom_html: "<h1>This is custom html</h1>",
    phone_number: "123-456-7890",
  },
  {
    id: 2,
    user_id: 1,
    loved_one_name: "John Doe",
    slug: "john-doe",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
    custom_html: "<h1>This is more custom html</h1>",
    phone_number: "123-456-7890",
  }
];

const mockTributeEvents = [
  {
    id: 1,
    tribute_id: 1,
    event_name: "Viewing",
    event_date: "2024-01-01T11:00:00Z",
    event_location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805",
    event_description: "A Viewing for family and friends.",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
  },
  {
    id: 2,
    tribute_id: 1,
    event_name: "Service",
    event_date: "2024-01-01T12:00:00Z",
    event_location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805",
    event_description: "A memorial service.",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
  },
  {
    id: 3,
    tribute_id: 1,
    event_name: "Burial",
    event_date: "2024-01-01T12:30:00Z",
    event_location: "Woodlawn Memory Gardens, 400 Woodlawn Cemetery Rd, Gotha...",
    event_description: "The burial service.",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
  },
];

const mockTributePages = [
  {
    id: 1,
    tribute_title: "Marie Marie Marie's Memorial Page",
    created_at: "2024-07-26T12:00:00Z",
    updated_at: "2024-07-26T12:00:00Z",
    user_id: 1,
    livestream_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    page_status: "published",
  }
];

const mockUsers = [
  {
    ID: 1,
    user_login: "testuser",
    user_pass: "password",
    user_email: "test@example.com",
    user_nicename: "test-user",
    user_url: "https://test.example.com",
    user_registered: "2024-07-26T12:00:00Z",
    user_activation_key: "1234",
    user_status: "1",
    display_name: "Test User"
  }
];

const mockTributeStreams = [
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
];

const mockFamilyPocProfiles = [
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
];

const mockCarts = {
  '12345': {
    id: '12345',
    items: [
      { name: 'Solo Package', price: 399 },
      { name: 'Extra Address', price: 199 }
    ],
    total: 598,
  }
}

//********************************************************
// Now define all handlers in one array
//********************************************************
export const handlers = [
  http.post('https://wp.tributestream.com/wp-json/jwt-auth/v1/token', async ({ request }) => {
    const { username, password } = await request.json();
    if (username === 'admin' && password === 'password') {
        return HttpResponse.json({
            success: true,
            token: 'mock-jwt-token-123'
        });
    }
    return HttpResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
    );
}),

  http.get(`${BASE_WORDPRESS_API}/wp-json/hero-details`, () => {
    return HttpResponse.json({
      title: "Memorial Service",
      location: "St. Mary's Church",
      startTime: "2024-02-01T10:00:00",
      notes: "Please arrive 15 minutes early",
      paymentStatus: "confirmed"
    });
  }),

  http.get(`${BASE_WORDPRESS_API}/wp-json/schedule`, () => {
    return HttpResponse.json([{
      startTime: "2024-02-01T10:00:00",
      streamType: "Memorial Service",
      estDuration: "1 hour",
      location: "St. Mary's Church"
    }]);
  }),

  // CRUD handlers for wpa2_tributes
  http.get(`${BASE_WORDPRESS_API}/tributes`, () => {
    return HttpResponse.json(mockTributes);
  }),
  http.post(`${BASE_WORDPRESS_API}/tributes`, async ({ request }) => {
    const tribute = await request.json();
    return HttpResponse.json({ ...tribute, id: 3 }, { status: 201 });
  }),
  http.put(`${BASE_WORDPRESS_API}/tributes/:id`, async ({ params, request }) => {
    const tribute = await request.json();
    return HttpResponse.json({ ...tribute, id: params.id });
  }),
  http.delete(`${BASE_WORDPRESS_API}/tributes/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Tribute with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_events
  http.get(`${BASE_WORDPRESS_API}/tribute-events`, () => {
    return HttpResponse.json(mockTributeEvents)
  }),
  http.post(`${BASE_WORDPRESS_API}/tribute-events`, async ({ request }) => {
    const event = await request.json();
    return HttpResponse.json({ ...event, id: 4 }, { status: 201 });
  }),
  http.put(`${BASE_WORDPRESS_API}/tribute-events/:id`, async ({ params, request }) => {
    const event = await request.json();
    return HttpResponse.json({ ...event, id: params.id });
  }),
  http.delete(`${BASE_WORDPRESS_API}/tribute-events/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Event with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_pages
  http.get(`${BASE_WORDPRESS_API}/tribute-pages`, () => {
    return HttpResponse.json(mockTributePages)
  }),
  http.post(`${BASE_WORDPRESS_API}/tribute-pages`, async ({ request }) => {
    const page = await request.json();
    return HttpResponse.json({ ...page, id: 2 }, { status: 201 });
  }),
  http.put(`${BASE_WORDPRESS_API}/tribute-pages/:id`, async ({ params, request }) => {
    const page = await request.json();
    return HttpResponse.json({ ...page, id: params.id });
  }),
  http.delete(`${BASE_WORDPRESS_API}/tribute-pages/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Page with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_tribute_streams
  http.get(`${BASE_WORDPRESS_API}/tribute-streams`, () => {
    return HttpResponse.json(mockTributeStreams)
  }),
  http.post(`${BASE_WORDPRESS_API}/tribute-streams`, async ({ request }) => {
    const stream = await request.json();
    return HttpResponse.json({ ...stream, id: 2 }, { status: 201 });
  }),
  http.put(`${BASE_WORDPRESS_API}/tribute-streams/:id`, async ({ params, request }) => {
    const stream = await request.json();
    return HttpResponse.json({ ...stream, id: params.id });
  }),
  http.delete(`${BASE_WORDPRESS_API}/tribute-streams/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Stream with ID ${params.id} deleted` });
  }),

  // CRUD handlers for wpa2_users
  http.get(`${BASE_WORDPRESS_API}/users`, () => {
    return HttpResponse.json(mockUsers);
  }),

  // CRUD handlers for wpa2_family_poc_profile
  http.get(`${BASE_WORDPRESS_API}/family-poc-profiles`, () => {
    return HttpResponse.json(mockFamilyPocProfiles);
  }),
  http.post(`${BASE_WORDPRESS_API}/family-poc-profiles`, async ({ request }) => {
    const profile = await request.json();
    return HttpResponse.json({ ...profile, id: 2 }, { status: 201 });
  }),
  http.put(`${BASE_WORDPRESS_API}/family-poc-profiles/:id`, async ({ params, request }) => {
    const profile = await request.json();
    return HttpResponse.json({ ...profile, id: params.id });
  }),
  http.delete(`${BASE_WORDPRESS_API}/family-poc-profiles/:id`, ({ params }) => {
    return HttpResponse.json({ message: `Profile with ID ${params.id} deleted` });
  }),

  // Mock registration endpoint
  http.post(`${BASE_WORDPRESS_API}/tributestream/v1/register`, async ({ request }) => {
    const userData = await request.json();
    console.log('Registration attempt with:', userData)
    return HttpResponse.json({
      user_id: '12345',
      message: 'User registered successfully'
    }, { status: 201 })
  }),

  // Mock tribute endpoints
  http.get(`${BASE_WORDPRESS_API}/tributestream/v1/tribute/:userId`, async ({ params }) => {
    const { slug } = params;
    console.log('Fetching tribute for slug:', slug);
    return HttpResponse.json({
      slug: slug,
      loved_one_name: "Test Name",
    });
  }),

  http.get(`${BASE_WORDPRESS_API}/tributestream/v1/tribute/:slug`, async ({ params }) => {
    const { slug } = params;
    console.log('Fetching tribute for slug:', slug);
    return HttpResponse.json({
      slug: slug,
      loved_one_name: "Test Name",
    });
  }),

  //********************************************************
  // Mock login endpoint
  //********************************************************
  http.post(`${BASE_WORDPRESS_API}/jwt-auth/v1/token`, async ({ request }) => {
    const { username, password } = await request.json();
    if (username === 'admin' && password === 'password') {
      return HttpResponse.json(
        { success: true, token: 'mock-jwt-token-123' },
        {
          headers: {
            'Set-Cookie': 'auth_token=mock-jwt-token-123; Path=/; HttpOnly; Secure; SameSite=Strict'
          }
        }
      );
    }
    return HttpResponse.json(
      { success: false, message: 'Invalid credentials' },
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
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }),

  // Mock cart save and load
  http.post(`${BASE_WORDPRESS_API}/tributestream/v1/saveCart`, async ({ request }) => {
    const cartData = await request.json();
    console.log('Cart Data:', cartData)
    return HttpResponse.json({
      cart_id: '12345',
      message: 'Cart updated successfully'
    }, { status: 201 })
  }),

  http.get(`${BASE_WORDPRESS_API}/tributestream/v1/loadCart`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(mockCarts['12345'])
    }
    return new HttpResponse(null, { status: 403 });
  }),

  http.get(`${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`, async () => {
    return HttpResponse.json({
      id: '1',
      phone: '1234567890',
      address: '123 Main St',
      created_at: '2023-01-01 00:00:00',
      updated_at: '2023-01-01 00:00:00',
      incomplete_cart: '0',
    })
  }),

  http.post(`${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`, async () => {
    return HttpResponse.json({ "updateStatus": "success" })
  }),

  ...userHandlers
];
