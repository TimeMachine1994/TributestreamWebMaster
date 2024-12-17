// src/lib/services/calculatorStore.js
import { writable, get } from 'svelte/store';

// Current page in the calculator form
export const currentPage = writable(1);

// Store for whether the livestream is at the funeral home
export const livestreamAtFuneralHome = writable(false);

// Store for selected package
export const selectedPackage = writable('');

export function selectPackage(packageName) {
    selectedPackage.set(packageName);
}
// Store for main form data
export const formData = writable({
    yourName: '',
    email: '',
    phoneNumber: '',
    livestreamDate: '',
    livestreamTime: '',
    livestreamLocation: '',
    secondAddress: '',
    thirdAddress: '',
});

// Function to convert text to URL-friendly format
export const urlFriendlyText = writable('your-custom-link');
export function convertText(text) {
    const slug = text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
     urlFriendlyText.set(slug);
}

// Store for livestream duration
export const livestreamDuration = writable(1);

// Additional location options
export const additionalLocations = writable({
    secondAddress: false,
    thirdAddress: false,
});

// Store for the price of the selected package
export const masterPrice = writable(0);

// Store for additional charges
export const additionalCharges = writable([
  {item: 'Extra Address', price: 199},
]);

// Store for the total cost
export const totalCost = writable(0);

// Subscribe to changes in additionalLocations to update additionalCharges
additionalLocations.subscribe(value => {
    const charges = [];
    if(value.secondAddress) {
        charges.push({item: 'Extra Address', price: 199})
    }
    if(value.thirdAddress) {
        charges.push({item: 'Extra Address', price: 199})
    }
     additionalCharges.set(charges);
})