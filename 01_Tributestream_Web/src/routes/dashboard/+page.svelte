<script lang="ts">
    import { goto } from '$app/navigation';
    import { dashboardStore, updateDashboardData } from '$lib/stores/dashboardStore';
    
    export let data;

    $: if (data.redirect) {
        goto(data.redirect);
    }

    $: if (data.success && data.dashboardData) {
        updateDashboardData(data.dashboardData);
    }
</script>

{#if data.success}
    <div class="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        
        <section class="profile-section">
            <h2>Family Profiles</h2>
            {#if $dashboardStore.familyProfiles?.length}
                <div class="profiles-grid">
                    {#each $dashboardStore.familyProfiles as profile}
                        <div class="profile-card">
                            <h3>{profile.name}</h3>
                            <p>{profile.phoneNumber}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>

        <section class="livestreams-section">
            <h2>Your Livestreams</h2>
            {#if $dashboardStore.userLivestreams?.length}
                <div class="livestreams-grid">
                    {#each $dashboardStore.userLivestreams as stream}
                        <div class="stream-card">
                            <h3>{stream.livestreamTime}</h3>
                            <p>{stream.livestreamLocation}</p>
                        </div>
                    {/each}
                </div>
            {/if}
        </section>
    </div>
{:else}
    <div class="error-container">
        <p>{data.error}</p>
    </div>
{/if}
