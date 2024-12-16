<<<<<<< HEAD
<!-- File: src/routes/my-portal/+page.svelte -->
<!-- Language: Svelte -->
<!-- 
  This page uses the TributestreamCard as a hero section, followed by multiple LivestreamCards as entry items.
  We ensure consistent sizing and spacing by wrapping everything in a centered container.
  
  Key changes:
    - Removed hard-coded widths in the TributestreamCard. Instead, rely on the parent container for sizing.
    - Used a max-width container with auto margins to center everything.
    - Ensured consistent spacing and sizing so the hero (TributestreamCard) and LivestreamCards align visually.
-->

<script lang="ts">

import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

  import { onMount } from 'svelte';

// Mock database call using localStorage for simplicity
const STORAGE_KEY = 'socialMediaAccordionState';

let isAccordionOpen = true; // Default to open

// Load saved state on mount
onMount(() => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState !== null) {
    isAccordionOpen = JSON.parse(savedState);
  }
});
 
    import TributestreamCard from '$lib/components/TributestreamCard.svelte';
    import LivestreamCard from '$lib/components/LivestreamCard.svelte';
  
    // Hero (TributestreamCard) data
    const mainTitle = "Celebration of life for Marie Marie Marie";
    const mainLocationName = "Tributestream Chapel";
    const mainLocationAddress = "10114 Tribute Road, Streaming City";
    const mainStartTime = "Jan 1, 2024 @ 3:30 PM";
  
    // Livestream events (LivestreamCards)
    const events = [
      {
        type: 'setup' as const,
        location: 'Funeral Home Setup Area',
        address: '123 Memory Lane, Streaming City',
        startTime: '3:00 PM',
        endTime: '4:00 PM',
        title: 'Setup of Equipment',
        details: 'Preparing cameras, microphones, and lighting before the service begins.'
      },
      {
        type: 'inside' as const,
        location: 'Funeral Home Viewing Room',
        address: '123 Memory Lane, Streaming City',
        startTime: '4:00 PM',
        endTime: '5:00 PM',
        title: 'Main Service Livestream',
        details: 'Broadcasting the main ceremony and eulogies live to family and friends.'
      }
    ];
  </script>
  

  <!-- Main container with a max width and auto margins to center content -->
  <div class="max-w-3xl mx-auto px-4 py-8 space-y-8">
  
    <!-- Hero Section: TributestreamCard -->
    <TributestreamCard
      title={mainTitle}
      locationName={mainLocationName}
      locationAddress={mainLocationAddress}
      startTime={mainStartTime}
    />
  

 
    <!-- Livestream Event Cards -->
    <div class="space-y-4">
      {#each events as event}
        <LivestreamCard
          type={event.type}
          location={event.location}
          address={event.address}
          startTime={event.startTime}
          endTime={event.endTime}
          title={event.title}
          details={event.details}
        />
      {/each}
    </div>
  </div>
  
=======
 
>>>>>>> 50579b6 (this is what i lost lmao)
