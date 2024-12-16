<script lang="ts">
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
   
    let username = '';
    let password = '';
    const error = writable('');
  
    async function handleLogin() {
      error.set(''); // Clear any previous errors
      try {
        const response = await fetch('http://localhost/wp-json/jwt-auth/v1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Failed to log in.');
        }
  
        // Save token to localStorage
        localStorage.setItem('jwt', data.data.token);
  
        // Redirect to the protected page
        goto('/dashboard');
      } catch (err) {
        error.set(err.message);
      }
    }
  </script>
  
  <form on:submit|preventDefault={handleLogin}>
    <label>
      Username:
      <input type="text" bind:value={username} required />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} required />
    </label>
    <button type="submit">Login</button>
    {#if $error}
      <p class="error">{$error}</p>
    {/if}
  </form>
  