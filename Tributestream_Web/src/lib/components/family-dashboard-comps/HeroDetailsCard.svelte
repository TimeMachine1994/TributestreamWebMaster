<script lang="ts">
	export let title: string;
	export let location: string;
	export let startTime: string;
	export let notes: string;
    export let paymentStatus: string;
</script>

<div class="bg-gray-100 rounded-lg p-6 flex max-w-full">
    <div class="relative w-1/2 pr-4">
        <div class="absolute top-0 left-0">
            <div class="bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                {paymentStatus} <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 mt-8">{title}</h2>
        <div>
            <p class="text-gray-600 font-semibold mb-1">Starting Location</p>
            <hr class="mb-2 border-gray-300"/>
            <p class="text-gray-700">{location}</p>
        </div>
        <div class="mt-2">
            <p class="text-gray-600 font-semibold mb-1">Start Time</p>
            <hr class="mb-2 border-gray-300"/>
            <p class="text-gray-700">{startTime}</p>
        </div>
        <div class="mt-2">
             <p class="text-gray-600 font-semibold mb-1">Notes</p>
            <hr class="mb-2 border-gray-300"/>
            <p class="text-gray-700">{notes}</p>
        </div>
    </div>
    <div class="w-1/2 bg-black rounded-lg">
         
    </div>
</div>