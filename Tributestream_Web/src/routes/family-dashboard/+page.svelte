<!-- src/routes/livestream/+page.svelte -->
<script lang="ts">
  import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
  import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
  import LivestreamSchedule from '$lib/components/family-dashboard-comps/LivestreamSchedule.svelte';

  //import { getLivestreamSchedule, getEventDetails } from '$lib/api/api';

  let eventDetails = {};
  let schedule = [];

  // On mount, fetch the event details and the schedule
  // In a real app, you might use load functions or other SSR features,
  // but for simplicity, we fetch on mount in the client.
//   onMount(async () => {
//     eventDetails = await getEventDetails();
//     schedule = await getLivestreamSchedule();
//   });
</script>

<!-- 
  Layout:
  We'll create a container page that has:
  - HeroDetailsCard at the top
  - OptionsPanel below it
  - LivestreamSchedule below that
-->

<div class="p-6 space-y-6">
  <!-- Hero Details Card -->
  <HeroDetailsCard
    eventTitle={eventDetails.title}
    paymentStatus={eventDetails.paymentStatus}
    locationName={eventDetails.locationName}
    locationAddress={eventDetails.locationAddress}
    startTime={eventDetails.startTime}
    notes={eventDetails.notes}
  />

  <!-- Options Panel -->
  <OptionsPanel />

  <!-- Livestream Schedule -->
  <LivestreamSchedule {schedule} />
</div>

<style>
  /* Add any additional styling if needed */
</style>
