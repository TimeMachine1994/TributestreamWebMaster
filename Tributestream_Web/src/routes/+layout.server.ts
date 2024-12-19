// src/routes/+layout.server.js
/** @type {import('./$types').LayoutServerLoad} */

export async function load({ locals }) {
    // locals.user is set by the hooks.server.js handle function
    return {
        user: locals.user
    };
}
