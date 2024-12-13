// src/lib/api.ts
const API_BASE_URL = '/api'; // You can change this if you have a different base URL

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
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
  return handleResponse<T>(response);
}


export async function post<T, U>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse<T>(response);
}
  
export async function put<T, U>(endpoint: string, data: U): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
  return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
  });
    return handleResponse<T>(response);
}