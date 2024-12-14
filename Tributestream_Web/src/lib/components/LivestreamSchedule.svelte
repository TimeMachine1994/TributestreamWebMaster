<script lang="ts">
	import type { TributeEvent } from '$lib/types';

    export let schedule: TributeEvent[];
</script>

<div class="mt-6 space-y-4">
    {#each schedule as event}
        <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-lg font-semibold mb-2">{event.event_name}</h3>
            <div class="flex justify-between text-sm text-gray-600">
                <div>
                    <p>
                        <span class="font-medium">Start Time:</span> {new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                     </p>
                     <p>
                         <span class="font-medium">Location:</span> {event.event_location}
                     </p>
                </div>
                <div>
                   
                </div>
            </div>
        </div>
    {/each}
</div>