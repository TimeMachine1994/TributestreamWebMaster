<svelte:head>

<script src="https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.0/backbone-min.js"></script>
<script src="https://wp.tributestream.com/wp-includes/js/wp-api.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Fanwood+Text:ital@0;1&display=swap" rel="stylesheet">
</svelte:head>

<!-- Styles -->
<style>
	/* Importing Google Font 'Fanwood' */
	@import url('https://fonts.googleapis.com/css2?family=Fanwood');
  
	/* Custom styles for the Tributestream title */
	.tributestream {
	  font-family: 'Great Vibes', 'Times New Roman', serif; /* Setting font family */
	  font-size: 48px; /* Setting font size */
	  letter-spacing: -1.5px; /* Adjusting letter spacing to make letters touch */
	}
  
	/* Styles for the registered trademark symbol */
	.r-symbol {
	  font-size: 0.4em; /* Smaller font size for the symbol */
	  vertical-align: top; /* Aligning symbol to the top */
	  position: relative; /* Relative positioning for fine-tuning */
	  top: -8px; /* Adjusting vertical position */
	  left: 5px; /* Adjusting horizontal position */
	}
  
	/* Scrollbar customizations */
	.fanwood-text-regular {
	font-family: "Fanwood Text", serif;
	font-weight: 400;
	font-style: normal;
  }
  
  .fanwood-text-regular-italic {
	font-family: "Fanwood Text", serif;
	font-weight: 400;
	font-style: italic;
  }
	
  </style>
<script lang="ts">
			/** @type {import('./$types').PageServerLoad} */
 /* Importing necessary functions and components */
 import { onMount } from 'svelte'; /* Svelte lifecycle function */
    import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton'; /* Skeleton UI components */
    import type { DrawerSettings } from '@skeletonlabs/skeleton'; /* Type-only import for DrawerSettings */
    import { goto } from '$app/navigation'; /* Function to navigate to a new page */
    import '../app.postcss'; /* Importing global styles */
    import '@fortawesome/fontawesome-free/css/all.min.css'
   // Add this to get the user's display name
  import { userStore } from '$lib/stores/authStore';

  let { data, children } = $props();
  
  let isLoggedIn = $state(false);
  let displayName = $state('');
  
  userStore.subscribe(user => {
    isLoggedIn = user.isLoggedIn;
    displayName = user.userInfo.displayName || 'Guest';
  });

  function handleAuthAction() {
    if (isLoggedIn) {
      // Clear the user data and localStorage
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userInfo');
      userStore.set({
        isLoggedIn: false,
        token: '',
        userInfo: {
          id: null,
          email: '',
          displayName: '',
          userLogin: '',
          userUrl: '',
          userRegistered: '',
        }
      });
      goto('/');
    } else {
      goto('/login');
    }
  }

  initializeStores();

  onMount(() => {
    /* Checks if a JWT token exists in localStorage */
    isLoggedIn = !!localStorage.getItem('jwtToken');
  
  });

</script>
<main>
	



	
 
<!-- Header Section -->
<header class="bg-black text-white">
    <div class="container mx-auto flex justify-between items-center py-4 px-4">
      <!-- Logo -->
      <a href="https://tributestream.com" class="text-xl text-white">
        <span class="tributestream">
          <i>Tributestream</i><span class="r-symbol">®</span>
        </span>
      </a>
      <!-- Navigation Menu -->
      <!-- On larger screens, show the menu items -->
      <nav class="hidden md:block">
        <ul class="flex space-x-4 items-center">
          <!-- Navigation Links -->
          <li>
            <a href="/why-tributestream" class="text-white hover:text-gray-300">
              Why Tributestream?
            </a>
          </li>
          <li>
            <a href="/how-it-works" class="text-white hover:text-gray-300">
              How does it work?
            </a>
          </li>
          <li>
            <a href="/contact" class="text-white hover:text-gray-300">
              Contact Us
            </a>
          </li>
          <li>
            <a href="/schedule" class="text-white hover:text-gray-300">
              Schedule Now
            </a>
          </li>
          <li>
            <button
            onclick={handleAuthAction}
            class="bg-[#D5BA7F] text-black py-2 px-4 border border-transparent rounded-lg hover:text-black"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          </li>
        </ul>
      </nav>
      <!-- On smaller screens, show the hamburger menu -->
      <button class="md:hidden focus:outline-none" onclick={console.log('add this')}>
        <!-- Hamburger Icon SVG -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
</main>