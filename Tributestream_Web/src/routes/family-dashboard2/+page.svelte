<script lang="ts">
    import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
    import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
     import LivestreamSchedule from '$lib/components/LivestreamSchedule.svelte';
    import { getTributeEvents } from '$lib/api';
    import type { TributeEvent } from '$lib/types';
    import { onMount } from 'svelte';
     import { authStore } from '$lib/services/authStore';
     
    const heroDetails = {
		title: "Celebration of life for Marie Marie Marie.",
		location: "Test Data 10114 Test Data Road.",
		startTime: "Jan 1, 2024 @ 3:30 PM.",
		notes: "As needed.",
        paymentStatus: "Payment Status: Complete"
	};

    let scheduleData:TributeEvent[] = $state([]);

    async function loadScheduleData() {
        try {
            scheduleData = await getTributeEvents()
        } catch (error) {
            console.log(error)
        }
    }
    
    onMount(async () => {
        await authStore.checkAuthStatus()
        if ($authStore.isLoggedIn) {
             loadScheduleData()
             authStore.handleInitialRedirect()
        }
        
    })
</script>

<div class="container mx-auto p-4 max-w-4xl">
     {#if !$authStore.isLoggedIn}
        <p>Please login</p>
     {/if}
    {#if $authStore.isLoggedIn}
        <HeroDetailsCard {...heroDetails} />
        <OptionsPanel />
         {#if scheduleData}
            <LivestreamSchedule schedule={scheduleData} />
        {/if}
    {/if}
</div>