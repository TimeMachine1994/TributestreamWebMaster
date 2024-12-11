// File: src/routes/api/send-email/+server.ts
// Language: TypeScript (SvelteKit Server Endpoint)
//
// This endpoint receives a POST request with JSON body including: { to, from, subject, text, html }
// It then uses the SendGrid client to send an email.
// Ensure your SENDGRID_API_KEY environment variable is set.
//
// Note: This code runs on the server, not the client.
// Make sure to have `@sendgrid/mail` installed:
// npm install @sendgrid/mail
//
// Also make sure to have a runtime adapter that supports Node.js if using Vercel/Netlify/etc.

import type { RequestHandler } from './$types';
import sgMail from '@sendgrid/mail';

export const POST: RequestHandler = async ({ request }) => {
  // Parse the request body
  const { to, from, subject, text, html } = await request.json();

  // Validate required fields
  if (!to || !from || !subject || !text || !html) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Set the API Key (make sure process.env.SENDGRID_API_KEY is defined)
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'SendGrid API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  sgMail.setApiKey(apiKey);

  const msg = {
    to,
    from,
    subject,
    text,
    html
  };

  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
