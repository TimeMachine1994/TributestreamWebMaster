<script lang="ts">
    import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
    import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
    import LivestreamSchedule from '$lib/components/family-dashboard-comps/LivestreamSchedule.svelte';
    // Define a generic get function
    import { get } from '$lib/api';
 

    export let data;
    const { heroDetails, scheduleData } = data;

    interface HeroDetails {
        title: string;
        location: string;
        startTime: string;
        notes: string;
        paymentStatus: string;
    }

    interface ScheduleItem {
        startTime: string;
        streamType: string;
        estDuration: string;
        location: string;
    }

 
 
</script>

<div class="container mx-auto p-4 max-w-4xl">
    {#if heroDetails}
        <HeroDetailsCard {...heroDetails} />
    {/if}
    <OptionsPanel />
    {#if scheduleData}
        <LivestreamSchedule schedule={scheduleData} />
    {/if}
</div>