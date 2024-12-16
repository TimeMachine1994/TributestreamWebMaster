<script>
    import { page } from '$app/stores';
    let currentRoute = '';
    $: currentRoute = $page.url.pathname
</script>
<div class="min-h-screen">
    <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-white font-bold text-xl">TributeStream</a>
             <div class="space-x-4">
                <a href="/schedule" class:text-blue-400={currentRoute === '/schedule'} class="text-gray-300 hover:text-white">Schedule</a>
                 <a href="/calculator" class:text-blue-400={currentRoute === '/calculator'} class="text-gray-300 hover:text-white">Calculator</a>
             </div>
        </div>
    </nav>
    
    <div class="container mx-auto">
     <slot />
    </div>
</div>