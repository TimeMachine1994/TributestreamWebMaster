<script lang="ts">
  import { goto } from '$app/navigation';
</script>

<div class="flex flex-row justify-between items-center gap-4 my-6">
  <button
    class="flex-1 flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg py-4"
    onclick={() => goto('/calculator')}
  >
    <span class="font-semibold mb-2">Upload Media for Livestream</span>
    <span class="text-2xl">↑</span>
  </button>
  <button
    class="flex-1 flex flex-col items-center justify-center bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg py-4"
    onclick={() => goto('/calculator')}
  >
    <span class="font-semibold mb-2">Edit Livestream Schedule</span>
    <span class="text-2xl">📅</span>
  </button>
  <button
    class="flex-1 flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg py-4"
  >
    <span class="font-semibold mb-2">Transfer Family Point of Contact</span>
    <span class="text-2xl">📲</span>
  </button>
  <button
    class="flex-1 flex flex-col items-center justify-center bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg py-4"
  >
    <span class="font-semibold mb-2">Invite Others to Share Media</span>
    <span class="text-2xl">📨</span>
  </button>
</div>
