<script>
    // Placeholder for form data
    let formData = {
        directorFirstName: '',
        directorLastName: '',
        familyFirstName: '',
        familyLastName: '',
        familyDateOfBirth: '',
        deceasedFirstName: '',
        deceasedLastName: '',
        deceasedDateOfBirth: '',
        deceasedDateOfPassing: '',
        email: '',
        phone: '',
        locationName: '',
        locationAddress: '',
        time: '',
        date: ''
    };
</script>

<div class="bg-black text-gray-900">
    <!-- Step Progress -->
    <div class="flex justify-center mb-8 pt-8">
        <div class="flex flex-col items-center mr-4">
            <div class="bg-yellow-600 w-28 h-10 flex items-center justify-center text-white font-semibold">
                <input type="checkbox" class="mr-2"><span>RESERVE</span>
            </div>
        </div>
        <div class="flex flex-col items-center mr-4">
            <div class="bg-yellow-600 w-28 h-10 flex items-center justify-center text-white font-semibold">
                <input type="checkbox" class="mr-2"><span>RECEIVE</span>
            </div>
        </div>
        <div class="flex flex-col items-center mr-4">
            <div class="bg-yellow-600 w-28 h-10 flex items-center justify-center text-white font-semibold">
                <input type="checkbox" class="mr-2"><span>RECORD</span>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <div class="bg-yellow-600 w-28 h-10 flex items-center justify-center text-white font-semibold">
                <input type="checkbox" class="mr-2"><span>RETURN</span>
            </div>
        </div>
    </div>

    <!-- Form Section -->
    <form class="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
        <!-- Director's Name -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Director's Name</label>
                <input type="text" bind:value={formData.directorFirstName} placeholder="First Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">&nbsp;</label>
                <input type="text" bind:value={formData.directorLastName} placeholder="Last Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Family Member Name -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Family Member Name</label>
                <input type="text" bind:value={formData.familyFirstName} placeholder="First Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">&nbsp;</label>
                <input type="text" bind:value={formData.familyLastName} placeholder="Last Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Family Member Date of Birth -->
        <div class="mb-4">
            <label class="block mb-1 font-semibold">Family Member Date of Birth</label>
            <input type="date" bind:value={formData.familyDateOfBirth} class="w-full px-3 py-2 border rounded">
        </div>

        <!-- Deceased Name -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Deceased Name</label>
                <input type="text" bind:value={formData.deceasedFirstName} placeholder="First Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">&nbsp;</label>
                <input type="text" bind:value={formData.deceasedLastName} placeholder="Last Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Deceased Dates -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Deceased Date of Birth</label>
                <input type="date" bind:value={formData.deceasedDateOfBirth} class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">Deceased Date of Passing</label>
                <input type="date" bind:value={formData.deceasedDateOfPassing} class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Contact Information</label>
                <input type="email" bind:value={formData.email} placeholder="Email Address"
                    class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">&nbsp;</label>
                <input type="tel" bind:value={formData.phone} placeholder="Phone Number"
                    class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Memorial Information -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Location Name</label>
                <input type="text" bind:value={formData.locationName} placeholder="Location Name"
                    class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">Location Address</label>
                <input type="text" bind:value={formData.locationAddress} placeholder="Location Address"
                    class="w-full px-3 py-2 border rounded">
            </div>
        </div>

        <!-- Time and Date -->
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label class="block mb-1 font-semibold">Time</label>
                <input type="time" bind:value={formData.time} class="w-full px-3 py-2 border rounded">
            </div>
            <div>
                <label class="block mb-1 font-semibold">Date</label>
                <input type="date" bind:value={formData.date} class="w-full px-3 py-2 border rounded">
            </div>
        </div>
    </form>
</div>
