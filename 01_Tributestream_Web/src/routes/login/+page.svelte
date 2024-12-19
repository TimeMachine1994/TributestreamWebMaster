<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    
    export let form;
    export let data;

 $: if (data.authenticated) {
    window.location.href = data.redirect;
}
</script>

<div class="login-container">
    <form method="POST" use:enhance>
        <h2>Login</h2>
        
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
        </div>

        {#if form?.message}
            <p class="error">{form.message}</p>
        {/if}

        <button type="submit">Login</button>
    </form>
</div>

<style>
    .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .error {
        color: red;
        margin-top: 1rem;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>
