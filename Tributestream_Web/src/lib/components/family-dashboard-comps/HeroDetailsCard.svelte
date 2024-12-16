<script>
    export let eventTitle = "Celebration of life for Marie Marie Marie.";
    export let paymentStatus = "Complete";
    export let locationName = "Test Data";
    export let locationAddress = "10114 Test Data Road";
    export let startTime = "Jan 1, 2024 @ 3:30 PM";
    export let notes = "As needed.";
  </script>
  
  <div class="bg-gray-100 rounded-lg p-6 flex flex-row gap-6">
    <div class="flex-1">
      <div class="inline-flex items-center mb-4">
        <span class="bg-green-200 text-green-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
          Payment Status: {paymentStatus}
        </span>
        <span class="text-green-800">&#10003;</span>
      </div>
      <h1 class="text-xl font-bold mb-4">{eventTitle}</h1>
      <div class="mb-4">
        <h2 class="text-md font-semibold">Starting Location</h2>
        <hr class="my-1" />
        <p>{locationName}</p>
        <p>{locationAddress}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-md font-semibold">Start Time</h2>
        <hr class="my-1" />
        <p>{startTime}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-md font-semibold">Notes</h2>
        <hr class="my-1" />
        <p>{notes}</p>
      </div>
    </div>
    <div class="flex-1 bg-black rounded-lg h-48"></div>
  </div>
  