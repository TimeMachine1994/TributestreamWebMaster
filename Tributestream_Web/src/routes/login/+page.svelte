<script lang="ts">
  import { preventDefault } from 'svelte/legacy';

    import { jwtStore } from '$lib/stores/jwtStore';
    import { goto } from '$app/navigation';
    
    let username = $state('');
    let password = $state('');
    let message = $state('');
    let isLoading = $state(false);
  
    function validateInputs(): boolean {
      console.log('Validating inputs:', { username: username.length > 0, password: password.length > 0 });
      if (!username || !password) {
        message = 'Please fill in all fields';
        return false;
      }
      return true;
    }
  
    async function makeLoginRequest() {
      console.log('Initiating login request for username:', username);
      const response = await fetch('https://wp.tributestream.com/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      console.log('Login response status:', response.status);
      return response;
    }
  
    async function handleLoginResponse(response: Response) {
      const data = await response.json();
      console.log('Login response data received:', { success: response.ok });
      
      if (!response.ok) {
        throw new Error(data.message || 'Invalid username or password');
      }
      return data;
    }
  
    function handleLoginSuccess(data: any) {
      console.log('Login successful, storing JWT');
      $jwtStore = data.token;
      message = 'Welcome back!';
      console.log('Redirecting to dashboard');
      goto('/family-dashboard');
    }
  
    function handleLoginError(error: unknown) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = 'Something went wrong. Please try again.';
      }
    }
  
    async function handleLogin() {
      console.log('Login process started');
      isLoading = true;
      message = '';
  
      try {
        if (!validateInputs()) {
          console.log('Input validation failed');
          return;
        }
  
        const response = await makeLoginRequest();
        const data = await handleLoginResponse(response);
        await handleLoginSuccess(data);
  
      } catch (error) {
        handleLoginError(error);
      } finally {
        console.log('Login process completed');
        isLoading = false;
      }
    }
  </script>
  
  <!-- Rest of the template remains the same -->
  <div class="login-container">
    <h1>Sign In</h1>
    
    <form onsubmit={preventDefault(handleLogin)}>
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          id="username" 
          bind:value={username} 
          disabled={isLoading}
          placeholder="Enter your username"
          required
        />
      </div>
  
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password} 
          disabled={isLoading}
          placeholder="Enter your password"
          required
        />
      </div>
  
      {#if message}
        <div class="message" role="alert">
          {message}
        </div>
      {/if}
  
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  </div>
  
  <style>
    /* Styles remain the same */
    .login-container {
      max-width: 400px;
      margin: 40px auto;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    .form-group {
      margin-bottom: 16px;
    }
  
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }
  
    input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
  
    .message {
      padding: 12px;
      margin-bottom: 16px;
      background: #f8d7da;
      border-radius: 4px;
      color: #721c24;
      text-align: center;
    }
  
    button {
      width: 100%;
      padding: 12px;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }
  
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  </style>
  