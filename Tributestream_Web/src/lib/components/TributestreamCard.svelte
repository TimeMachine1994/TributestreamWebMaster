<!-- File: src/lib/TributestreamCard.svelte -->
<!-- Language: Svelte -->
<!-- 
  TributestreamCard component (hero section):
  Now includes a matrix of social media icons below the main content to facilitate sharing.
-->
<script lang="ts">
    export let title: string = "Celebration of life for Marie Marie Marie";
    export let locationName: string = "Test Data";
    export let locationAddress: string = "10114 Test Data Road";
    export let startTime: string = "Jan 1, 2024 @ 3:30 PM";
  
    // Social media platforms with their respective icons and links
    const socialMedia = [
      {
        name: "Facebook",
        url: "https://facebook.com",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/facebook.svg"
      },
      {
        name: "WhatsApp",
        url: "https://wa.me/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/whatsapp.svg"
      },
      {
        name: "Telegram",
        url: "https://telegram.org/",
        icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/telegram.svg"
      },
    //   {
    //     name: "Instagram",
    //     url: "https://instagram.com",
    //     icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/instagram.svg"
    //   },
    //   {
    //     name: "BlueSky",
    //     url: "https://bsky.app/",
    //     icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/bluesky.svg"
    //   },
    //   {
    //     name: "Threads",
    //     url: "https://threads.net/",
    //     icon: "https://cdn.jsdelivr.net/npm/simple-icons/icons/meta.svg"
    //   }
    ];
  </script>
  
  <div class="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md w-full mx-auto flex flex-col space-y-4">
    <!-- Top Section: Main Content -->
    <div class="flex">
      <!-- Left Section: Content -->
      <div class="w-2/5 pr-4 flex flex-col justify-between">
        <div>
          <!-- Title -->
          <h2 class="text-lg font-bold mb-2">{title}</h2>
  
          <!-- Location Address -->
          <div class="mb-4">
            <h3 class="font-semibold text-sm">Location Address</h3>
            <p class="text-sm">{locationName}</p>
            <p class="text-sm">{locationAddress}</p>
          </div>
  
          <!-- Start Time -->
          <div>
            <h3 class="font-semibold text-sm">Start Time</h3>
            <p class="text-sm">{startTime}</p>
          </div>
           <!-- Bottom Section: Social Media Icons -->
    <div class="grid grid-cols-3 gap-4 text-center mt-4 mb-3">
        {#each socialMedia as { name, url, icon }}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class="p-4 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
            title={`Share on ${name}`}
          >
            <img src={icon} alt={name} class="w-5 h-5 mx-auto " />
            <!-- <p class="text-sm font-semibold text-gray-800">{name}</p> -->
          </a>
        {/each}
      </div>
        </div>
      </div>
  
      <!-- Right Section: Placeholder for Video or Image -->
      <div class="w-3/5 flex justify-center items-center">
        <div
          class="w-full h-0 bg-black border-2 border-blue-500 rounded-md"
          style="padding-top: 56.25%; /* Aspect Ratio 16:9 */"
        ></div>
      </div>
    </div>
  
   
  </div>
  