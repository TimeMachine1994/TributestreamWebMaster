// src/lib/api.ts
const BASE_WORDPRESS_API = 'http://localhost/wp-json';
const MAIN_URL = 'http://localhost'; // You can change this if you have a different base URL

interface ApiError {
    message: string,
    status?: number,
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error:ApiError = {
        message: `API Error: ${response.status} ${response.statusText}`,
        status: response.status,
    };
    let errorData:any;
    try {
        errorData = await response.json();
        error.message = errorData.message
    } catch (e) {
        // Handle the case where json cannot be parsed. 
    }
    throw error;
  }
  try {
      return await response.json() as T;
  } catch (e) {
      return await response.text() as T;
  }
}

export async function get<T>(endpoint: string): Promise<T> {
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<T>(response);
}


export async function post<T, U>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
}
  
export async function put<T, U>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint, {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
  });
    return handleResponse<T>(response);
}

// **************************************************************
// ::Start of our custom api endpoints
// **************************************************************

// CRUD handlers for wpa2_tributes
export const getTributes = () => get<any[]>(`${BASE_WORDPRESS_API}/tributes`);
export const postTributes = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tributes`, data);
export const putTributes = (id:number, data:any) => put<any, any>(`${BASE_WORDPRESS_API}/tributes/${id}`, data);
export const deleteTributes = (id:number) => del<any>(`${BASE_WORDPRESS_API}/tributes/${id}`);

// CRUD handlers for wpa2_tribute_events
export const getTributeEvents = () => get<any[]>(`${BASE_WORDPRESS_API}/tribute-events`);
export const postTributeEvents = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tribute-events`, data);
export const putTributeEvents = (id:number, data:any) => put<any, any>(`${BASE_WORDPRESS_API}/tribute-events/${id}`, data);
export const deleteTributeEvents = (id:number) => del<any>(`${BASE_WORDPRESS_API}/tribute-events/${id}`);

// CRUD handlers for wpa2_tribute_pages
export const getTributePages = () => get<any[]>(`${BASE_WORDPRESS_API}/tribute-pages`);
export const postTributePages = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tribute-pages`, data);
export const putTributePages = (id:number, data:any) => put<any, any>(`${BASE_WORDPRESS_API}/tribute-pages/${id}`, data);
export const deleteTributePages = (id:number) => del<any>(`${BASE_WORDPRESS_API}/tribute-pages/${id}`);

// CRUD handlers for wpa2_tribute_streams
export const getTributeStreams = () => get<any[]>(`${BASE_WORDPRESS_API}/tribute-streams`);
export const postTributeStreams = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tribute-streams`, data);
export const putTributeStreams = (id:number, data:any) => put<any, any>(`${BASE_WORDPRESS_API}/tribute-streams/${id}`, data);
export const deleteTributeStreams = (id:number) => del<any>(`${BASE_WORDPRESS_API}/tribute-streams/${id}`);

// CRUD handlers for wpa2_users
export const getUsers = () => get<any[]>(`${BASE_WORDPRESS_API}/users`);

// CRUD handlers for wpa2_family_poc_profile
export const getFamilyPocProfiles = () => get<any[]>(`${BASE_WORDPRESS_API}/family-poc-profiles`);
export const postFamilyPocProfiles = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/family-poc-profiles`, data);
export const putFamilyPocProfiles = (id:number, data:any) => put<any, any>(`${BASE_WORDPRESS_API}/family-poc-profiles/${id}`, data);
export const deleteFamilyPocProfiles = (id:number) => del<any>(`${BASE_WORDPRESS_API}/family-poc-profiles/${id}`);


// CRUD handlers for wpa2_tribute_pages
//Intercept POST that would normally register the user.
export const postRegisterUser = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tributestream/v1/register`, data)
// get a single tribute by slug
export const getTributeBySlug = (slug:string) => get<any>(`${BASE_WORDPRESS_API}/tributestream/v1/tribute/${slug}`)
// get a single tribute by user id
export const getTributeByUserId = (userId:string) => get<any>(`${BASE_WORDPRESS_API}/tributestream/v1/tribute/${userId}`)
//Intercept POST that would normally create the tribute page.
export const postTribute = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tributestream/v1/tribute`, data)

// JWT Token Generation
export const postToken = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/jwt-auth/v1/token`, data)

// JWT Token Validation
export const postTokenValidate = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/jwt-auth/v1/token/validate`, data)


// intercept GET reqeusts to the Wordpress API
export const getUsersMe = () => get<any>(`${BASE_WORDPRESS_API}/wp/v2/users/me`);

// handle livestream cart update between pages 4 and 5. 
export const postSaveCart = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tributestream/v1/saveCart`, data)

// load a family poc profile by id
export const getFamilyPocProfile = () => get<any>(`${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`)

export const postFamilyPocProfile = (data:any) => post<any, any>(`${BASE_WORDPRESS_API}/tributestream/v1/family_poc_profile`, data)