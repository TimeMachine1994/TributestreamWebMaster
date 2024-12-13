<script lang="ts">
    import HeroDetailsCard from '$lib/components/family-dashboard-comps/HeroDetailsCard.svelte';
    import OptionsPanel from '$lib/components/family-dashboard-comps/OptionsPanel.svelte';
    import LivestreamSchedule from '$lib/components/family-dashboard-comps/LivestreamSchedule.svelte';
    
    const heroDetails = {
		title: "Celebration of life for Marie Marie Marie.",
		location: "Test Data 10114 Test Data Road.",
		startTime: "Jan 1, 2024 @ 3:30 PM.",
		notes: "As needed.",
        paymentStatus: "Payment Status: Complete"
	};

    const scheduleData = [
        {
            startTime: "11:00 AM",
            streamType: "Viewing",
            estDuration: "1 Hour",
            location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805"
        },
        {
            startTime: "12:00 PM",
            streamType: "Service",
            estDuration: "1 Hour",
            location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805"
        },
         {
            startTime: "12:30 PM",
            streamType: "Burial",
            estDuration: "30 Min.",
            location: "Woodlawn Memory Gardens, 400 Woodlawn Cemetery Rd, Gotha..."
        }
    ];
</script>

<div class="container mx-auto p-4 max-w-4xl">
    <HeroDetailsCard {...heroDetails} />
    <OptionsPanel />
    <LivestreamSchedule schedule={scheduleData} />
</div>