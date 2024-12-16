<<<<<<< HEAD
<script>
    // Bindings for the form inputs
    let username = '';
    let password = '';
    let errorMessage = '';

    // Function to handle form submission
    async function handleLogin(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Clear previous errors
        errorMessage = '';

        // Placeholder for the actual login request logic
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMessage = errorData.error || 'Login failed. Please try again.';
                return;
            }

            // If successful, redirect or update UI
            const data = await response.json();
            alert('Login successful! Redirecting...');
            window.location.href = '/'; // Redirect to homepage or another protected page
        } catch (err) {
            errorMessage = 'An unexpected error occurred. Please try again later.';
            console.error(err);
=======
<script lang="ts">
    import { authStore } from '$lib/services/authStore';
    import { goto } from '$app/navigation';
    let username = '';
    let password = '';
    let loginError = '';

    async function handleSubmit() {
        try {
            await authStore.login(username, password);
            authStore.handleInitialRedirect();
             // Changed to handle redirect in the authStore
        } catch (e: any) {
            loginError = e.message || "Login Failed";
>>>>>>> 21c0810 (Old work)
        }
    }
</script>

<<<<<<< HEAD
<!-- Login form UI -->
<section class="login-container">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    <!-- Form -->
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
        <div>
            <label for="username" class="block font-bold">Username:</label>
            <input
                id="username"
                type="text"
                bind:value={username}
                class="border px-2 py-1 w-full"
                placeholder="Enter your username"
                required
            />
        </div>
        <div>
            <label for="password" class="block font-bold">Password:</label>
            <input
                id="password"
                type="password"
                bind:value={password}
                class="border px-2 py-1 w-full"
                placeholder="Enter your password"
                required
            />
        </div>

        <!-- Error message -->
        {#if errorMessage}
            <p class="text-red-500">{errorMessage}</p>
        {/if}

        <!-- Submit button -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
</section>

<style>
    .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }
</style>
=======
<div class="flex justify-center items-center h-screen">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
         <h2 class="block text-gray-700 text-2xl font-bold mb-6 text-center">Login</h2>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" bind:value={username}>
            </div>
             <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"  bind:value={password}>
            </div>
         {#if loginError}
            <div class="text-red-500 text-sm mb-4">{loginError}</div>
        {/if}
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" on:click={handleSubmit}>
                    Sign In
                </button>
           
             </div>
    </div>
</div>
>>>>>>> 21c0810 (Old work)
