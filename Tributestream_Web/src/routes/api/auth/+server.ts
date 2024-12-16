
export const POST: RequestHandler = async ({ request }) => {
  const { token } = await request.json();
  
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Set-Cookie': `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/`
    }
  });
};
