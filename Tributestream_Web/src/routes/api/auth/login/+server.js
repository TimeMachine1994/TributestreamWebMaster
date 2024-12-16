// src/routes/api/auth/login/+server.js
// Endpoint to handle login requests. It expects a POST request with JSON {username, password}.
export async function POST({ request }) {
    try {
        const { username, password } = await request.json();

        const wpJwtUrl = 'http://localhost/wp-json/jwt-auth/v1/token';

        const res = await fetch(wpJwtUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            const errorBody = await res.json();
            return new Response(
                JSON.stringify({ error: 'Login failed', details: errorBody }),
                { status: 401 }
            );
        }

        const data = await res.json();
        const token = data.token;
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'No token returned' }),
                { status: 500 }
            );
        }

        // Set an HTTP-only cookie with the token
        const responseHeaders = new Headers();
        // Secure and HttpOnly is crucial in production. Set Secure flag if using HTTPS.
        responseHeaders.set(
            'Set-Cookie', 
            `token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict; Max-Age=3600`
        );

        // Return success response
        return new Response(
            JSON.stringify({ success: true }),
            { headers: responseHeaders, status: 200 }
        );

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Server error', details: err.message }), { status: 500 });
    }
}
