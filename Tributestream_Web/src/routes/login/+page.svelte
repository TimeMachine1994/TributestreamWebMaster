<!-- src/routes/login/+page.svelte -->
<script>
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin(event) {
      event.preventDefault();
      const res = await fetch('http://localhost/jwt-auth/v1/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
          // On success, we can redirect the user to the home page or a protected page.
          await goto('/family-dashboard');
      } else {
          errorMessage = data.error || 'Unknown error during login.';
      }
  }
</script>

<form on:submit={handleLogin} class="space-y-4">
  <div>
      <label for="username" class="block font-bold">Username:</label>
      <input id="username" type="text" bind:value={username} class="border px-2 py-1" required />
  </div>
  <div>
      <label for="password" class="block font-bold">Password:</label>
      <input id="password" type="password" bind:value={password} class="border px-2 py-1" required />
  </div>
  {#if errorMessage}
      <p class="text-red-500">{errorMessage}</p>
  {/if}
  <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
</form>
