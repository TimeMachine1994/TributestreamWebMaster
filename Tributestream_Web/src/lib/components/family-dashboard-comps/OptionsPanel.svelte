<!-- <<<<<<< HEAD
<script lang="ts">
    const options = [
        { label: 'Upload Media for Livestream', icon: 'arrow-up', color: 'bg-sky-100' },
        { label: 'Edit Livestream Schedule', icon: 'calendar', color: 'bg-pink-100' },
        { label: 'Transfer Family Point of Contact', icon: 'phone', color: 'bg-rose-100' },
        { label: 'Invite Others to Share Media', icon: 'paper-plane', color: 'bg-purple-100' }
    ];
</script>

<div class="flex justify-between space-x-4 mt-4 max-w-full">
    {#each options as option}
        <button class={`flex flex-col items-center justify-center p-4 rounded-lg  ${option.color}`}>
            <span class="text-xs text-center mb-1">{option.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {#if option.icon === 'arrow-up'}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L4 12m4-4v12" />
                 {:else if option.icon === 'calendar'}
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 {:else if option.icon === 'phone'}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 {:else if option.icon === 'paper-plane'}
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                 {/if}
            </svg>
        </button>
    {/each}
</div>
======= -->
<div class="flex flex-row justify-between items-center gap-4 my-6">
  <button class="flex-1 flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg py-4">
    <span class="font-semibold mb-2">Upload Media for Livestream</span>
    <span class="text-2xl">↑</span>
  </button>
  <button class="flex-1 flex flex-col items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg py-4">
    <span class="font-semibold mb-2">Edit Livestream Schedule</span>
    <span class="text-2xl">📅</span>
  </button>
  <button class="flex-1 flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg py-4">
    <span class="font-semibold mb-2">Transfer Family Point of Contact</span>
    <span class="text-2xl">📲</span>
  </button>
  <button class="flex-1 flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg py-4">
    <span class="font-semibold mb-2">Invite Others to Share Media</span>
    <span class="text-2xl">📨</span>
  </button>
</div>
