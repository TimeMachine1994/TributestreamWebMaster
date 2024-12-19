<script lang="ts">
  import { onMount } from 'svelte';
  import { jwtStore } from '$lib/stores/jwtStore';
  import { get } from 'svelte/store';

  import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
  import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
  import LivestreamSchedule from '$lib/components/LivestreamSchedule.svelte';

 
  let tributes = [];
  let errorMessage = $state('');
  let schedule = $state([]); // This will hold the schedule data

  onMount(async () => {
    try {
      const token = get(jwtStore);
      if (!token) {
        throw new Error('User is not authenticated');
      }

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

      // Assuming tributes contain schedule data
      schedule = tributes.map(tribute => ({
        event_name: tribute.loved_one_name,
        event_date: tribute.created_at,
        event_location: 'Sample Location' // Replace with actual location if available
      }));

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

  <HeroDetailsCard
    eventTitle="Celebration of life for Marie Marie Marie."
    paymentStatus="Complete"
    locationName="Test Data"
    locationAddress="10114 Test Data Road"
    startTime="Jan 1, 2024 @ 3:30 PM"
    notes="As needed."
  />

  <OptionsPanel />

  <LivestreamSchedule schedule={schedule} />
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
