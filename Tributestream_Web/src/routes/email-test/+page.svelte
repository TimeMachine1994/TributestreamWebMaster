<!-- File: src/routes/send-email/+page.svelte -->
<!-- Language: Svelte -->
<!-- 
  This component provides a simple form where a user can compose an email message:
  - "to" address
  - "from" address
  - "subject"
  - "text" content
  - "html" content

  When submitted, it will call a SvelteKit server endpoint that uses the SendGrid API to send the email.
  
  Make sure you have set the SENDGRID_API_KEY in your environment variables (e.g., in .env).
  
  Flow:
  1. User fills out the form.
  2. On form submit, we call our POST endpoint at /api/send-email, sending JSON with all fields.
  3. The endpoint uses SendGrid’s Node.js client to send the email.
  
  Prerequisites:
  - npm install @sendgrid/mail
  - Ensure your SvelteKit project is configured to load environment variables, and that SENDGRID_API_KEY is set.
-->

<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

    import { page } from '$app/stores';
  
    // We set up local component state to hold the email form data
    let to = $state('recipient@example.com');
    let from = $state('sender@example.com');
    let subject = $state('Your Subject Here');
    let text = $state('Plain text message here...');
    let html = $state('<strong>HTML version of message here...</strong>');
  
    let sending = $state(false);
    let responseMessage = $state('');
  
    async function sendEmail() {
      sending = true;
      responseMessage = '';
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to, from, subject, text, html })
        });
  
        if (res.ok) {
          responseMessage = 'Email successfully sent!';
        } else {
          const errorData = await res.json();
          responseMessage = `Failed to send email: ${errorData.error || 'Unknown error'}`;
        }
      } catch (err: any) {
        responseMessage = `An error occurred: ${err.message || err}`;
      } finally {
        sending = false;
      }
    }
  </script>
  
  <div class="max-w-md mx-auto p-4 space-y-4">
    <h1 class="text-2xl font-bold mb-4">Send an Email</h1>
    <form
      onsubmit={preventDefault(sendEmail)}
      class="space-y-4"
    >
      <div>
        <label class="block mb-1 font-semibold">To:</label>
        <input type="email" bind:value={to} class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block mb-1 font-semibold">From:</label>
        <input type="email" bind:value={from} class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block mb-1 font-semibold">Subject:</label>
        <input type="text" bind:value={subject} class="w-full border rounded p-2" required />
      </div>
      <div>
        <label class="block mb-1 font-semibold">Text Content:</label>
        <textarea bind:value={text} class="w-full border rounded p-2" required></textarea>
      </div>
      <div>
        <label class="block mb-1 font-semibold">HTML Content:</label>
        <textarea bind:value={html} class="w-full border rounded p-2" required></textarea>
      </div>
  
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send Email'}
      </button>
    </form>
    {#if responseMessage}
      <div class="mt-4 text-sm">
        {responseMessage}
      </div>
    {/if}
  </div>
  