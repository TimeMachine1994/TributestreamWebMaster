<script lang="ts">
    export let schedule: { startTime: string, streamType: string, estDuration: string, location: string }[];
</script>

<div class="bg-white rounded-lg shadow p-6 mt-6 max-w-full">
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Current Livestream Schedule</h2>
        <button class="bg-pink-100 text-xs px-2 py-1 rounded-md">Edit</button>
    </div>
    <div class="overflow-x-auto">
        <table class="min-w-full table-auto">
            <thead class="text-left">
                <tr>
                    <th class="py-2">Start Time</th>
                    <th class="py-2">Stream Type</th>
                    <th class="py-2">Est. Duration</th>
                    <th class="py-2">Location</th>
                </tr>
            </thead>
            <tbody>
                {#each schedule as item, i}
                <tr class:bg-gray-100={i % 2 === 0} class="border-b border-gray-200">
                    <td class="py-3">{item.startTime}</td>
                    <td class="py-3">{item.streamType}</td>
                    <td class="py-3">{item.estDuration}</td>
                    <td class="py-3">{item.location}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>