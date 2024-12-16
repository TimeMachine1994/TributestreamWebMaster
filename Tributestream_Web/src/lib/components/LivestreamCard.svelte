<!-- File: src/lib/LivestreamCard.svelte -->
<!-- Language: Svelte -->
<!-- No changes needed here, just ensure it fits nicely within the parent container. -->
<script lang="ts">
    export let type: 'outside' | 'inside' | 'church' | 'setup';
    export let location: string;
    export let address: string;
    export let startTime: string;
    export let endTime: string;
    export let title: string;
    export let details: string;
  
    function getColorClasses(type: string): string {
      switch (type) {
        case 'outside':
          return 'bg-blue-100 border-blue-300 text-blue-900';
        case 'inside':
          return 'bg-green-100 border-green-300 text-green-900';
        case 'church':
          return 'bg-purple-100 border-purple-300 text-purple-900';
        case 'setup':
          return 'bg-yellow-100 border-yellow-300 text-yellow-900';
        default:
          return 'bg-gray-100 border-gray-300 text-gray-900';
      }
    }
  </script>
  
  <div class={`flex border-l-8 p-4 rounded shadow-sm w-full ${getColorClasses(type)}`}>
    <!-- Left Side: Times -->
    <div class="flex-shrink-0 pr-4 border-r border-gray-300">
      <div class="text-sm font-bold">{startTime}</div>
      <div class="text-sm font-bold">{endTime}</div>
    </div>
  
    <!-- Right Side: Location, Title, Address, and Details -->
    <div class="pl-4 flex-grow">
      <div class="text-lg font-semibold mb-1">{title}</div>
      <div class="text-md font-bold mb-1">{location}</div>
      <div class="text-sm italic mb-2">{address}</div>
      <div class="text-sm">{details}</div>
    </div>
  </div>
  