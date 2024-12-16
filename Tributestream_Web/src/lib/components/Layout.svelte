<script>
    import { page } from '$app/stores';
    import { authStore } from '$lib/services/authStore';
    let currentRoute = '';
    $: currentRoute = $page.url.pathname
</script>
<div class="min-h-screen">
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-white font-bold text-xl">TributeStream</a>
             <div class="space-x-4">
                 {#if $authStore.isLoggedIn}
                     <a href="/family-dashboard" class:text-blue-400={currentRoute === '/family-dashboard'} class="text-gray-300 hover:text-white">Family Portal</a>
                     <a href="/schedule" class:text-blue-400={currentRoute === '/schedule'} class="text-gray-300 hover:text-white">Schedule</a>
                      <a href="/calculator" class:text-blue-400={currentRoute === '/calculator'} class="text-gray-300 hover:text-white">Calculator</a>
                     <button class="text-gray-300 hover:text-white" on:click={authStore.logout}>Logout</button>
                 {:else}
                <a href="/calculator" class:text-blue-400={currentRoute === '/calculator'} class="text-gray-300 hover:text-white">Calculator</a>
                <a href="/login" class:text-blue-400={currentRoute === '/login'} class="text-gray-300 hover:text-white">Login</a>
                 {/if}
             </div>
        </div>
    </nav>
    
    <div class="container mx-auto">
     <slot />
    </div>
</div>