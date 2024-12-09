<!-- File: LivestreamSetup.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import {
        currentPage,
        livestreamAtFuneralHome,
        selectedPackage,
        selectPackage,
        formData,
        convertText,
        livestreamDuration,
        additionalLocations,
        masterPrice,
        additionalCharges,
        totalCost,
        urlFriendlyText
    } from '$lib/services/calculatorStore.js';
//LOL
    // Editing variables for custom URL text
    let editing = false;
    let tempUrlText = '';

    function startEdit() {
        editing = true;
        tempUrlText = get(urlFriendlyText); // Get the current URL-friendly text from the store
    }

    function saveEdit() {
        // Update the text via the provided convertText function, which updates the store
        convertText(tempUrlText);  
        editing = false;  
    }

    function cancelEdit() {
        editing = false;
        tempUrlText = ''; 
    }

    function nextStep() {
        currentPage.update(n => n + 1);
    }

    function previousStep() {
        currentPage.update(n => n - 1);
    }

    function handleSubmit() {
        // Replace alert with actual submission logic as needed
        alert('Submission complete!');
    }

    // Handle package selection
    function handlePackageSelection(packageName: string, price: number) {
        selectPackage(packageName);
        masterPrice.set(price);
        calculateTotalCost();
    }

    // Calculate total cost based on selected package and additional charges
    function calculateTotalCost() {
        const basePrice = get(masterPrice);
        const extras = get(additionalCharges);
        const additionalCost = extras.reduce((sum: number, charge: { item: string, price: number }) => sum + charge.price, 0);
        totalCost.set(basePrice + additionalCost);
    }

    // -----------------------------------------
    // Square Payment Integration
    // -----------------------------------------
    const appId = 'sandbox-sq0idb-fLmmKUp3weFYhS3cYmDy-w'; // Replace with your App ID
    const locationId = 'LBZ6V29STVG69'; // Replace with your Location ID

    let card: any;
    let paymentStatus = '';

    // Initialize the Square payment form.
    async function initializePaymentForm() {
    
        if (typeof Square === 'undefined') {
            throw new Error('Square.js failed to load properly. Check your app.html script tag.');
        }

        const payments = Square.payments(appId, locationId);
        card = await payments.card();
        await card.attach('#card-container'); // Attach the card element to the div with id="card-container"
    }

    async function tokenize(paymentMethod: any) {
        const tokenResult = await paymentMethod.tokenize();
        if (tokenResult.status === 'OK') {
            return tokenResult.token;
        } else {
            let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
            if (tokenResult.errors) {
                errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
            }
            throw new Error(errorMessage);
        }
    }
    function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}
 

    async function handlePaymentMethodSubmission() {
        try {
            paymentStatus = '';
            const token = await tokenize(card);

            const paymentResponse = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    locationId,
                    sourceId: token
                })
            });

            if (paymentResponse.ok) {
                paymentStatus = 'Payment completed';
            } else {
                const errorBody = await paymentResponse.text();
                throw new Error(errorBody);
            }
        } catch (e: any) {
            paymentStatus = 'Payment failed';
            console.error(e.message);
        }
    }

    onMount(async () => {
        // -----------------------------------------
        // On component mount:
        // 1. Check if we have a JWT token in the cookies
        // 2. If we do, decode it to get the user_id
        // 3. Use that user_id to fetch tribute data from our WP REST route
        // 4. Pre-fill formData from the retrieved tribute data
        // -----------------------------------------

        // Get JWT token from cookies (replace 'jwt_token' with the actual cookie name you are using)
        let token = getCookie('jwt_token');
        if (token) {
            try {
                // Decode the JWT to get user data
                const decoded = jwt_decode(token);

                // Check if decoded token has user_id
                if (decoded && decoded.user_id) {
                    const userId = decoded.user_id;

                    // Fetch tribute data from our custom WP REST route
                    // Note: Adjust the fetch URL to match your WP REST API endpoint setup
                    // This endpoint: /wp-json/tributestream/v1/tributes?user_id=<userId>
                    const response = await fetch(`/wp-json/tributestream/v1/tributes?user_id=${userId}`, {
                        method: 'GET'
                    });

                    if (!response.ok) {
                        console.error('Error fetching tribute data:', response.status, response.statusText);
                    } else {
                        const tributeData = await response.json();

                        // Pre-fill formData with tributeData fields
                        // Here we assume tributeData is an object with keys that match formData properties.
                        // If keys differ, map them accordingly.
                        formData.update(d => {
                            // Return a new object that merges the existing d with the tributeData
                            return { ...d, ...tributeData };
                        });
                    }
                } else {
                    console.warn('JWT token decoded, but no user_id found.');
                }
            } catch (error) {
                console.error('Error decoding JWT token:', error);
            }
        } else {
            console.log('No JWT token found in cookies.');
        }
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-black">
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Livestream Setup</h3>
            <div class="text-sm text-gray-500">Step {$currentPage} of 5</div>
        </div>

        <!-- Custom Link Display -->
        <div class="text-center py-4">
            <div class="text-lg font-medium text-gold-500">Your Loved One's Custom Link:</div>
            {#if editing}
                <div class="inline-flex items-center">
                    <input type="text" class="text-md text-gold-500 border border-gray-300 focus:ring-0" bind:value={tempUrlText} />
                    <i class="fas fa-check text-green-500 cursor-pointer ml-2" on:click={saveEdit}></i>
                    <i class="fas fa-times text-red-500 cursor-pointer ml-2" on:click={cancelEdit}></i>
                </div>
            {:else}
                <div class="text-md text-gold-500 cursor-pointer" on:click={startEdit}>
                    {$urlFriendlyText} <i class="fas fa-pencil-alt pl-2"></i>
                </div>
            {/if}
        </div>

        <div class="border-t border-gray-200 flex">
            <div class="{($currentPage >= 4 ? 'w-2/3' : 'w-full')} p-6">
                <!-- Dynamic form content -->
                {#if $currentPage === 1}
                <!-- Page 1: Basic Information -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-y-6">
                        <div>
                            <label for="your-name" class="block text-sm font-medium text-gray-700">Your Name</label>
                            <input type="text" id="your-name" bind:value={$formData.yourName} placeholder="Your Name" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Your Email Address</label>
                            <input type="email" id="email" bind:value={$formData.email} placeholder="Email" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="text" id="phone-number" bind:value={$formData.phoneNumber} placeholder="Phone Number" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>
                </div>
                {:else if $currentPage === 2}
                <!-- Page 2: Livestream Details -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-y-6">
                        <div>
                            <label for="livestream-date" class="block text-sm font-medium text-gray-700">Livestream Date</label>
                            <input type="date" id="livestream-date" bind:value={$formData.livestreamDate} placeholder="Select Date" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label for="start-time" class="block text-sm font-medium text-gray-700">Livestream Start Time</label>
                            <input type="time" id="start-time" bind:value={$formData.livestreamTime} class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <label for="livestream-location" class="block text-sm font-medium text-gray-700">Livestream Location</label>
                            <input type="text" id="livestream-location" bind:value={$formData.livestreamLocation} placeholder="Location" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                        <div>
                            <div class="flex items-center">
                                <input id="funeral-home" type="checkbox" bind:checked={$livestreamAtFuneralHome} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                <label for="funeral-home" class="ml-2 block text-sm text-gray-900">Is this at a funeral home?</label>
                            </div>
                        </div>
                    </div>
                </div>
                {:else if $currentPage === 3}
                <!-- Page 3: Package Selection -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-y-4">
                        {#if $livestreamAtFuneralHome}
                        <button on:click={() => handlePackageSelection('Solo', 399)} class={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${$selectedPackage === 'Solo' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white hover:bg-blue-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                            Solo Package - $399 {#if $selectedPackage === 'Solo'}(Selected){/if}
                        </button>
                        {/if}
                        <button on:click={() => handlePackageSelection('Anywhere', 499)} class={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${$selectedPackage === 'Anywhere' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white hover:bg-blue-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                            Anywhere Package - $499 {#if $selectedPackage === 'Anywhere'}(Selected){/if}
                        </button>
                        <button on:click={() => handlePackageSelection('Legacy', 799)} class={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md ${$selectedPackage === 'Legacy' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white hover:bg-blue-100'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}>
                            Legacy Package - $799 {#if $selectedPackage === 'Legacy'}(Selected){/if}
                        </button>
                    </div>
                </div>
                {:else if $currentPage === 4}
                <!-- Page 4: Additional Options -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-y-4">
                        <div>
                            <label for="duration" class="block text-sm font-medium text-gray-700">Livestream Duration (hours)</label>
                            <input type="range" id="duration" min="1" max="8" bind:value={$livestreamDuration} class="mt-1 block w-full" />
                            <div class="text-right text-sm text-gray-600">{$livestreamDuration} hours</div>
                        </div>
                        <div>
                            <div class="flex items-center">
                                <input id="second-address" type="checkbox" bind:checked={$additionalLocations.secondAddress} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                <label for="second-address" class="ml-2 block text-sm text-gray-900">Add second address?</label>
                            </div>
                            {#if $additionalLocations.secondAddress}
                            <input type="text" bind:value={$formData.secondAddress} placeholder="Enter second address" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            {/if}
                        </div>
                        <div>
                            <div class="flex items-center">
                                <input id="third-address" type="checkbox" bind:checked={$additionalLocations.thirdAddress} class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
                                <label for="third-address" class="ml-2 block text-sm text-gray-900">Add third address?</label>
                            </div>
                            {#if $additionalLocations.thirdAddress}
                            <input type="text" bind:value={$formData.thirdAddress} placeholder="Enter third address" class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                            {/if}
                        </div>
                    </div>
                </div>
                {:else if $currentPage === 5}
                <!-- Page 5: Summary and Payment -->
                <div class="px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 gap-y-4">
                        <div class="text-sm font-medium text-gray-900">Summary of your selections:</div>
                        <div class="text-sm text-gray-500">Name: {$formData.yourName}</div>
                        <div class="text-sm text-gray-500">Email: {$formData.email}</div>
                        <div class="text-sm text-gray-500">Phone: {$formData.phoneNumber}</div>
                        <div class="text-sm text-gray-500">Date: {$formData.livestreamDate}</div>
                        <div class="text-sm text-gray-500">Package: {$selectedPackage}</div>
                        <div class="text-sm text-gray-500">Additional Addresses: {JSON.stringify($additionalLocations)}</div>
                        <div class="text-sm text-gray-500">Total Cost: {$totalCost}</div>
                    </div>

                    <!-- Square Payment Form -->
                    {#await initializePaymentForm()}
                        <p>Loading...</p>
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}

                    <form on:submit|preventDefault={handlePaymentMethodSubmission}>
                        <div id="card-container"></div>
                        <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Pay ${$totalCost}
                        </button>

                        <div class="flex space-x-4 mt-4">
                            <button type="button" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Pay in full: ${($totalCost * 0.95).toFixed(2)} <br>(5% Discount)
                            </button>
                            <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Pay Half Now (${($totalCost / 2).toFixed(2)}) and Half Later
                            </button>
                        </div>
                    </form>

                    {#if paymentStatus}
                        <div id="payment-status-container" class="mt-4">{paymentStatus}</div>
                    {/if}

                    {#if paymentStatus === 'Payment completed'}
                        <button on:click={handleSubmit} class="w-full inline-flex justify-center py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Confirm and Submit
                        </button>
                    {/if}
                </div>
                {/if}
            </div>

            {#if $currentPage >= 4}
            <div class="w-1/3 bg-gray-100 p-6 border-l border-gray-200">
                <h4 class="text-lg font-semibold mb-4">Your Cart</h4>
                <ul class="text-sm">
                    <li>Package: {$selectedPackage} - ${$masterPrice}</li>
                    {#each $additionalCharges as charge}
                    <li>{charge.item}: +${charge.price}</li>
                    {/each}
                    <li>Total Cost: ${$totalCost}</li>
                </ul>
            </div>
            {/if}
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {#if $currentPage > 1}
            <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" on:click={previousStep}>
                Back
            </button>
            {/if}

            {#if $currentPage < 5}
            <button class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" on:click={nextStep}>
                Next
            </button>
            {/if}

            {#if $currentPage === 5}
            <button class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" on:click={handleSubmit}>
                Confirm and Submit
            </button>
            {/if}
        </div>
    </div>
</div>
