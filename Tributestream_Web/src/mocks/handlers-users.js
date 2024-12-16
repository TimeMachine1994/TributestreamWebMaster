// File: src/mocks/handlers-users.js
// Language: JavaScript

// This file sets up Mock Service Worker (MSW) handlers to simulate the default WordPress user endpoints.
// It provides mock responses for the following endpoints:
// 1. GET /wp/v2/users              - List users
// 2. POST /wp/v2/users             - Create a new user
// 3. GET /wp/v2/users/:id          - Retrieve a specific user by ID
// 4. POST /wp/v2/users/:id         - Update a user by ID
// 5. DELETE /wp/v2/users/:id       - Delete a user by ID
// 6. GET /wp/v2/users/me           - Retrieve the currently authenticated user
// 7. POST /wp/v2/users/me          - Update the currently authenticated user
// 8. DELETE /wp/v2/users/me        - Delete the currently authenticated user
//
// For demonstration purposes, we store users in memory. All "user records" in this mock abide by the 
// schema described above. The fields have been simplified to focus on the main properties.
//
// Note: Auth/authentication is simplified. For "me" routes, we assume that if a request has a cookie 
// named "authToken", the user is authenticated. Otherwise, we return a 401 Unauthorized.
// This is a mock and does not represent secure or production-ready auth logic.
//
// This mock setup will help frontend developers integrate against these endpoints without a live backend.

import { http, HttpResponse } from 'msw'

// In-memory store of users. We'll use a Map keyed by user ID, containing user objects.
// Each user object will reflect the schema provided, at least minimally.
const users = new Map()

// We will keep track of a next user ID to simulate user creation.
let nextUserId = 1

// Prepopulate with a single user to simulate "existing" data and for "me" endpoints.
const initialUser = {
  id: nextUserId++,
  username: 'jdoe',
  name: 'John Doe',
  first_name: 'John',
  last_name: 'Doe',
  email: 'jdoe@example.com',
  url: 'https://example.com/jdoe',
  description: 'A sample user',
  link: 'https://example.com/author/jdoe', // Author URL
  locale: 'en_US',
  nickname: 'johny',
  slug: 'jdoe',
  registered_date: '2020-01-01T00:00:00Z',
  roles: ['subscriber'],
  capabilities: {},
  extra_capabilities: {},
  avatar_urls: {
    '24': 'https://example.com/avatar/jdoe-24.png',
    '48': 'https://example.com/avatar/jdoe-48.png',
    '96': 'https://example.com/avatar/jdoe-96.png'
  },
  meta: {}
}

// Insert the initial user into our map
users.set(initialUser.id, initialUser)

// Helper function to get the "current user" based on auth token cookie.
// For simplicity, we assume the first user in the Map is the "me" user.
function getCurrentUser(cookies) {
  // If no auth cookie, not authenticated
  if (!cookies || !cookies.authToken) return null
  // Return the first user (initialUser)
  // In a real scenario, you'd use the token to identify which user is "me".
  return initialUser
}

export const userHandlers = [

  // ---------------------------------------------------------------------------
  // GET /wp/v2/users - List users
  // ---------------------------------------------------------------------------
  // Returns a list of all existing users. In a real WordPress install, arguments
  // can filter and paginate results, but we'll return all users for simplicity.
  http.get('/wp/v2/users', () => {
    const allUsers = Array.from(users.values())
    return HttpResponse.json(allUsers, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // POST /wp/v2/users - Create a new user
  // ---------------------------------------------------------------------------
  // Required fields: username, email, password
  // We will validate the presence of these fields. If missing, return an error.
  // If present, create a new user with a unique ID.
  http.post('/wp/v2/users', async ({ request }) => {
    const payload = await request.json()

    const { username, email, password } = payload

    // Validate required fields
    if (!username || !email || !password) {
      return HttpResponse.json({
        code: 'rest_missing_callback_param',
        message: 'Missing one or more required fields: username, email, password',
        data: { status: 400 }
      }, { status: 400 })
    }

    const newUser = {
      id: nextUserId++,
      username: username,
      name: payload.name || '',
      first_name: payload.first_name || '',
      last_name: payload.last_name || '',
      email: email,
      url: payload.url || '',
      description: payload.description || '',
      link: `https://example.com/author/${username}`,
      locale: payload.locale || 'en_US',
      nickname: payload.nickname || username,
      slug: payload.slug || username,
      registered_date: new Date().toISOString(),
      roles: payload.roles || ['subscriber'],
      capabilities: {},
      extra_capabilities: {},
      avatar_urls: {
        '24': `https://example.com/avatar/${username}-24.png`,
        '48': `https://example.com/avatar/${username}-48.png`,
        '96': `https://example.com/avatar/${username}-96.png`
      },
      meta: {}
      // password is never included in responses
    }

    users.set(newUser.id, newUser)

    return HttpResponse.json(newUser, { status: 201 })
  }),

  // ---------------------------------------------------------------------------
  // GET /wp/v2/users/:id - Retrieve a specific user by ID
  // ---------------------------------------------------------------------------
  http.get('/wp/v2/users/:id', ({ params }) => {
    const { id } = params
    const userId = parseInt(id, 10)
    const user = users.get(userId)

    if (!user) {
      return HttpResponse.json({
        code: 'rest_user_invalid_id',
        message: 'Invalid user ID.',
        data: { status: 404 }
      }, { status: 404 })
    }

    return HttpResponse.json(user, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // POST /wp/v2/users/:id - Update a user by ID
  // ---------------------------------------------------------------------------
  // Fields that can be updated are similar to creation fields, except id is required.
  http.post('/wp/v2/users/:id', async ({ params, request }) => {
    const { id } = params
    const userId = parseInt(id, 10)
    const user = users.get(userId)

    if (!user) {
      return HttpResponse.json({
        code: 'rest_user_invalid_id',
        message: 'Invalid user ID.',
        data: { status: 404 }
      }, { status: 404 })
    }

    const payload = await request.json()

    // Update the user fields based on the payload:
    user.username = payload.username !== undefined ? payload.username : user.username
    user.name = payload.name !== undefined ? payload.name : user.name
    user.first_name = payload.first_name !== undefined ? payload.first_name : user.first_name
    user.last_name = payload.last_name !== undefined ? payload.last_name : user.last_name
    user.email = payload.email !== undefined ? payload.email : user.email
    user.url = payload.url !== undefined ? payload.url : user.url
    user.description = payload.description !== undefined ? payload.description : user.description
    user.locale = payload.locale !== undefined ? payload.locale : user.locale
    user.nickname = payload.nickname !== undefined ? payload.nickname : user.nickname
    user.slug = payload.slug !== undefined ? payload.slug : user.slug
    // roles, password, meta can also be updated
    if (payload.roles !== undefined) user.roles = payload.roles
    if (payload.meta !== undefined) user.meta = payload.meta
    // password is never returned, so we do not store it for simplicity.

    users.set(user.id, user) // Update the map

    return HttpResponse.json(user, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // DELETE /wp/v2/users/:id - Delete a user by ID
  // ---------------------------------------------------------------------------
  // Required arguments: force = true, and reassign (another user ID)
  // If user doesn't exist, return 404. If valid, remove user and reassign posts (not implemented here),
  // just return a success response.
  http.delete('/wp/v2/users/:id', ({ params, request }) => {
    const { id } = params
    const url = new URL(request.url)
    const force = url.searchParams.get('force')
    const reassign = url.searchParams.get('reassign')

    const userId = parseInt(id, 10)
    const user = users.get(userId)

    if (!user) {
      return HttpResponse.json({
        code: 'rest_user_invalid_id',
        message: 'Invalid user ID.',
        data: { status: 404 }
      }, { status: 404 })
    }

    if (!force || force !== 'true') {
      return HttpResponse.json({
        code: 'rest_trash_not_supported',
        message: 'Users do not support trashing.',
        data: { status: 501 }
      }, { status: 501 })
    }

    if (!reassign) {
      return HttpResponse.json({
        code: 'rest_missing_callback_param',
        message: 'You must provide a user ID to reassign posts to.',
        data: { status: 400 }
      }, { status: 400 })
    }

    users.delete(userId)

    return HttpResponse.json(user, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // GET /wp/v2/users/me - Retrieve the currently authenticated user
  // ---------------------------------------------------------------------------
  // If authToken cookie is present, return the first user (initialUser).
  // If not authenticated, return 401.
  http.get('/wp/v2/users/me', ({ cookies }) => {
    const currentUser = getCurrentUser(cookies)
    if (!currentUser) {
      return HttpResponse.json({
        code: 'rest_not_logged_in',
        message: 'You are not currently logged in.',
        data: { status: 401 }
      }, { status: 401 })
    }
    return HttpResponse.json(currentUser, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // POST /wp/v2/users/me - Update the currently authenticated user
  // ---------------------------------------------------------------------------
  // Similar to POST /wp/v2/users/:id, but uses the authenticated user.
  http.post('/wp/v2/users/me', async ({ cookies, request }) => {
    const currentUser = getCurrentUser(cookies)
    if (!currentUser) {
      return HttpResponse.json({
        code: 'rest_not_logged_in',
        message: 'You are not currently logged in.',
        data: { status: 401 }
      }, { status: 401 })
    }

    const payload = await request.json()

    // Update the currently authenticated user's fields
    currentUser.username = payload.username !== undefined ? payload.username : currentUser.username
    currentUser.name = payload.name !== undefined ? payload.name : currentUser.name
    currentUser.first_name = payload.first_name !== undefined ? payload.first_name : currentUser.first_name
    currentUser.last_name = payload.last_name !== undefined ? payload.last_name : currentUser.last_name
    currentUser.email = payload.email !== undefined ? payload.email : currentUser.email
    currentUser.url = payload.url !== undefined ? payload.url : currentUser.url
    currentUser.description = payload.description !== undefined ? payload.description : currentUser.description
    currentUser.locale = payload.locale !== undefined ? payload.locale : currentUser.locale
    currentUser.nickname = payload.nickname !== undefined ? payload.nickname : currentUser.nickname
    currentUser.slug = payload.slug !== undefined ? payload.slug : currentUser.slug
    if (payload.roles !== undefined) currentUser.roles = payload.roles
    if (payload.meta !== undefined) currentUser.meta = payload.meta

    // Update the user in the map as well
    users.set(currentUser.id, currentUser)

    return HttpResponse.json(currentUser, { status: 200 })
  }),

  // ---------------------------------------------------------------------------
  // DELETE /wp/v2/users/me - Delete the currently authenticated user
  // ---------------------------------------------------------------------------
  // Requires force=true and reassign=<id>. 
  // If not authenticated, 401. If conditions not met, return an error.
  http.delete('/wp/v2/users/me', ({ cookies, request }) => {
    const currentUser = getCurrentUser(cookies)
    if (!currentUser) {
      return HttpResponse.json({
        code: 'rest_not_logged_in',
        message: 'You are not currently logged in.',
        data: { status: 401 }
      }, { status: 401 })
    }

    const url = new URL(request.url)
    const force = url.searchParams.get('force')
    const reassign = url.searchParams.get('reassign')

    if (!force || force !== 'true') {
      return HttpResponse.json({
        code: 'rest_trash_not_supported',
        message: 'Users do not support trashing.',
        data: { status: 501 }
      }, { status: 501 })
    }

    if (!reassign) {
      return HttpResponse.json({
        code: 'rest_missing_callback_param',
        message: 'You must provide a user ID to reassign posts to.',
        data: { status: 400 }
      }, { status: 400 })
    }

    // Remove the currentUser from the map
    users.delete(currentUser.id)

    // Return the deleted user's data
    return HttpResponse.json(currentUser, { status: 200 })
  }),
]
