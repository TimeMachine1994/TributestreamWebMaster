<script lang="ts">
    import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
    import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
    import LivestreamSchedule from '$lib/components/family-dashboard-comps/LivestreamSchedule.svelte';
    // Define a generic get function
    import { get } from '$lib/api';
 

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

    let heroDetails:HeroDetails;
    let scheduleData:ScheduleItem[] = [];
	

	async function loadData() {
		try {
			heroDetails = await get<HeroDetails>('/hero-details');
            scheduleData = await get<ScheduleItem[]>('/schedule');
		} catch (error) {
            console.log(error)
            // Handle errors here
		}
	}

	loadData()
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