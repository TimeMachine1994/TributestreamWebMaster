import { http, HttpResponse } from 'msw';


const mockHeroDetails = {
	title: "Celebration of life for Marie Marie Marie.",
	location: "Test Data 10114 Test Data Road.",
	startTime: "Jan 1, 2024 @ 3:30 PM.",
	notes: "As needed.",
    paymentStatus: "Payment Status: Complete"
};

const mockScheduleData = [
    {
        startTime: "11:00 AM",
        streamType: "Viewing",
        estDuration: "1 Hour",
        location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805"
    },
    {
        startTime: "12:00 PM",
        streamType: "Service",
        estDuration: "1 Hour",
        location: "A Community Funeral Home, 910 W Michigan St, Orlando, FL 32805"
    },
    {
        startTime: "12:30 PM",
        streamType: "Burial",
        estDuration: "30 Min.",
        location: "Woodlawn Memory Gardens, 400 Woodlawn Cemetery Rd, Gotha..."
    }
];



export const handlers = [
    http.get('/api/hero-details', () => {
      return HttpResponse.json(mockHeroDetails);
    }),
    http.get('/api/schedule', () => {
        return HttpResponse.json(mockScheduleData)
    }),
];