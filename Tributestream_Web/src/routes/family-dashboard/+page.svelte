<script lang="ts">
    import { onMount } from 'svelte';
    import { jwtStore } from '$lib/stores/jwtStore';
    import { get } from 'svelte/store';
  
    let tributes = [];
    let errorMessage = '';
  
    onMount(async () => {
      try {
        const token = get(jwtStore);
        if (!token) {
          throw new Error('User is not authenticated');
        }
  
        // Fetch tributes using the mock handler
        const response = await fetch('http://localhost/wp-json/tributes', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch tributes');
        }
  
        tributes = await response.json();
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      }
    });
  </script>
  
  <div class="dashboard-container">
    <h1>Family Dashboard</h1>
  
    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
  
    {#if tributes.length > 0}
      <ul>
        {#each tributes as tribute}
          <li>
            <h2>{tribute.loved_one_name}</h2>
            <p>Created at: {tribute.created_at}</p>
            <p>Status: {tribute.page_status}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No tributes found.</p>
    {/if}
  </div>
  
  <style>
    .dashboard-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 24px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  
    .error-message {
      color: red;
      margin-bottom: 16px;
    }
  
    ul {
      list-style-type: none;
      padding: 0;
    }
  
    li {
      margin-bottom: 16px;
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
  