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
        }
    }
</script>

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
