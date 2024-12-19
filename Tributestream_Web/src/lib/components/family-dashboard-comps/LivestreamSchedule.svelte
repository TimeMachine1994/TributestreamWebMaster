<!-- <<<<<<< HEAD
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
                </tr>˙
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
</div> -->

<script lang="ts">
  let { schedule = [
      {
        startTime: "11:00 AM",
        streamType: "Viewing",
        duration: "1 Hour",
        locationName: "A Community Funeral Home",
        locationAddress: "910 W Michigan St, Orlando, FL 32805",
      },
      {
        startTime: "12:00 PM",
        streamType: "Service",
        duration: "1 Hour",
        locationName: "A Community Funeral Home",
        locationAddress: "910 W Michigan St, Orlando, FL 32805",
      },
      {
        startTime: "12:30 PM",
        streamType: "Burial",
        duration: "30 Min",
        locationName: "Woodlawn Memory Gardens",
        locationAddress: "400 Woodlawn Cemetery Rd, Gotha...",
      },
    ] } = $props();
  </script>
  
  <div class="bg-gray-100 rounded-lg p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold">Current Livestream Schedule</h2>
      <button class="bg-rose-100 text-rose-800 font-semibold rounded-full px-4 py-2 hover:bg-rose-200">
        Edit
      </button>
    </div>
    <table class="w-full text-left text-sm">
      <thead class="border-b border-gray-300">
        <tr>
          <th class="py-2">Start Time</th>
          <th class="py-2">Stream Type</th>
          <th class="py-2">Est. Duration</th>
          <th class="py-2">Location</th>
        </tr>
      </thead>
      <tbody>
        {#each schedule as row, i}
          <tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td class="py-2 px-2">{row.startTime}</td>
            <td class="py-2 px-2">{row.streamType}</td>
            <td class="py-2 px-2">{row.duration}</td>
            <td class="py-2 px-2">
              {row.locationName}, {row.locationAddress}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div> 