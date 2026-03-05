const http = require('http');
const url = require('url');

// Timezone mapping for countries
const timezones = {
  "India": "Asia/Kolkata",
  "Italy": "Europe/Rome",
  "France": "Europe/Paris",
  "Netherlands": "Europe/Amsterdam"
};

// Function to get local time for a country
function getLocalTime(country) {
  const timezone = timezones[country] || "UTC";
  return new Date().toLocaleString('en-GB', { 
    timeZone: timezone,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Hotel data
const hotels = [
  {
    "propertyId": "201",
    "propertyName": "Taj Delhi",
    "country": "India",
    "email": "tajdelhi@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919812345678",
    "address": "New Delhi",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "Euro/Mastercard,Visa",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "202",
    "propertyName": "Taj Mumbai",
    "country": "India",
    "email": "tajmumbai@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919911223344",
    "address": "Mumbai",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Visa,Mastercard,Amex",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Completed",
      "serr": "-"
    }
  },
  {
    "propertyId": "203",
    "propertyName": "Oberoi Bangalore",
    "country": "India",
    "email": "oberoi@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+918045678901",
    "address": "Bangalore",
    "review": "Bad",
    "propertyType": "Resort",
    "bookingModel": "Request to book",
    "system": "XML Hotel not activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "No credit-cards accepted, only cash",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Not Applicable",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "204",
    "propertyName": "Hotel Roma Palace",
    "country": "Italy",
    "email": "roma@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+390612345678",
    "address": "Via Roma 25, Rome, Italy",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Request to book",
    "system": "XML Hotel activated",
    "language": "Italian",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "CartaSi,Maestro,Euro/Mastercard,Visa",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "205",
    "propertyName": "Grand Amsterdam Stay",
    "country": "Netherlands",
    "email": "amsterdam@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+31201234567",
    "address": "Damrak 45, Amsterdam, Netherlands",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "Dutch",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Euro/Mastercard,Visa,Amex",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Completed",
      "serr": "-"
    }
  },
  {
    "propertyId": "206",
    "propertyName": "Hilton Paris Center",
    "country": "France",
    "email": "paris@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+33123456789",
    "address": "Rue de Rivoli 18, Paris, France",
    "review": "Bad",
    "propertyType": "Hotel",
    "bookingModel": "Request to book",
    "system": "XML Hotel not activated",
    "language": "French",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "Carte Bleue,Visa,Mastercard",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Not Applicable",
      "dsa": "Completed",
      "serr": "-"
    }
  },
  {
    "propertyId": "207",
    "propertyName": "Taj Goa",
    "country": "India",
    "email": "tajgoa@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919876543210",
    "address": "Goa",
    "review": "Good",
    "propertyType": "Resort",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "Visa,Mastercard,RuPay",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "208",
    "propertyName": "ITC Grand Chola",
    "country": "India",
    "email": "itcchennai@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+914412345678",
    "address": "Chennai",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Visa,Mastercard,Amex,RuPay",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Completed",
      "serr": "-"
    }
  },
  {
    "propertyId": "209",
    "propertyName": "ITC Maurya",
    "country": "India",
    "email": "itcdelhi@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+911123456789",
    "address": "New Delhi",
    "review": "Bad",
    "propertyType": "Hotel",
    "bookingModel": "Request to book",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "Visa,Mastercard",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Not Applicable",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "210",
    "propertyName": "ITC Maratha",
    "country": "India",
    "email": "itcmumbai@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+912212345678",
    "address": "Mumbai",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "English",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Visa,Mastercard,RuPay",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "211",
    "propertyName": "Hotel Venezia Grand",
    "country": "Italy",
    "email": "venezia@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+390412345678",
    "address": "San Marco 1234, Venice, Italy",
    "review": "Good",
    "propertyType": "Hotel",
    "bookingModel": "Request to book",
    "system": "XML Hotel activated",
    "language": "Italian",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "CartaSi,Visa,Mastercard",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Completed",
      "serr": "-"
    }
  },
  {
    "propertyId": "212",
    "propertyName": "Le Marais Boutique Hotel",
    "country": "France",
    "email": "lemarais@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+33145678901",
    "address": "Rue des Francs 12, Paris, France",
    "review": "Good",
    "propertyType": "Boutique Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "French",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Carte Bleue,Visa,Mastercard,Amex",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Not Applicable",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "213",
    "propertyName": "Nice Riviera Resort",
    "country": "France",
    "email": "niceriviera@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+33493123456",
    "address": "Promenade des Anglais 50, Nice, France",
    "review": "Good",
    "propertyType": "Resort",
    "bookingModel": "Request to book",
    "system": "XML Hotel activated",
    "language": "French",
    "paymentDetails": {
      "paymentModel": "Not on payments",
      "cvc": "No CVC Code",
      "creditCardsAccepted": "Carte Bleue,Visa,Mastercard",
      "vccStatus": "On date of booking"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Not Applicable",
      "serr": "-"
    }
  },
  {
    "propertyId": "214",
    "propertyName": "Canal View Amsterdam",
    "country": "Netherlands",
    "email": "canalview@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+31206789012",
    "address": "Herengracht 100, Amsterdam, Netherlands",
    "review": "Good",
    "propertyType": "Boutique Hotel",
    "bookingModel": "Instant booking",
    "system": "XML Hotel activated",
    "language": "Dutch",
    "paymentDetails": {
      "paymentModel": "Hybrid",
      "cvc": "CVC Required",
      "creditCardsAccepted": "Euro/Mastercard,Visa,Maestro",
      "vccStatus": "Check-in +1"
    },
    "kyp": {
      "bhfs": "-",
      "dac7": "Completed",
      "dsa": "Completed",
      "serr": "-"
    }
  }
];

// Helper function to add localTime to hotel(s)
function addLocalTime(data) {
  if (Array.isArray(data)) {
    return data.map(hotel => ({
      ...hotel,
      localTime: getLocalTime(hotel.country)
    }));
  }
  return {
    ...data,
    localTime: getLocalTime(data.country)
  };
}

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

// Request handler
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Handle preflight OPTIONS request (needed for CORS from Swagger Editor)
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // GET /api/partner/hotels - Get all hotels
  if (pathname === '/api/partner/hotels' && req.method === 'GET') {
    return sendJSON(res, 200, { hotels: addLocalTime(hotels) });
  }

  // GET /api/partner/hotels/search?name=taj - Search hotels by name
  if (pathname === '/api/partner/hotels/search' && req.method === 'GET') {
    const name = query.name;
    if (!name) {
      return sendJSON(res, 400, { error: "Please provide 'name' query parameter" });
    }
    const results = hotels.filter(hotel =>
      hotel.propertyName.toLowerCase().includes(name.toLowerCase())
    );
    return sendJSON(res, 200, { hotels: addLocalTime(results) });
  }

  // GET /api/partner/hotels/country/:country - Get hotels by country
  const countryMatch = pathname.match(/^\/api\/partner\/hotels\/country\/(.+)$/);
  if (countryMatch && req.method === 'GET') {
    const country = decodeURIComponent(countryMatch[1]);
    const results = hotels.filter(hotel =>
      hotel.country.toLowerCase() === country.toLowerCase()
    );
    return sendJSON(res, 200, { hotels: addLocalTime(results) });
  }

  // GET /api/partner/hotel?id=201 - Get hotel by ID
  if (pathname === '/api/partner/hotel' && req.method === 'GET') {
    const id = query.id;
    if (!id) {
      return sendJSON(res, 400, { error: "Please provide 'id' query parameter" });
    }
    const hotel = hotels.find(h => h.propertyId === id);
    if (!hotel) {
      return sendJSON(res, 404, { error: "Hotel not found" });
    }
    return sendJSON(res, 200, addLocalTime(hotel));
  }

  // GET /api/partner/hotels/filter?name=taj&id=201 - Filter by name OR id (whichever provided)
  if (pathname === '/api/partner/hotels/filter' && req.method === 'GET') {
    const name = query.name;
    const id = query.id;
    
    if (!name && !id) {
      return sendJSON(res, 400, { error: "Please provide 'name' or 'id' query parameter" });
    }
    
    let results = hotels;
    
    if (id) {
      results = results.filter(h => h.propertyId === id);
    }
    
    if (name) {
      results = results.filter(h => 
        h.propertyName.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    return sendJSON(res, 200, { hotels: addLocalTime(results) });
  }

  // GET /api/partner/hotels/query?q=taj OR ?q=201 - Unified search (auto-detect name or id)
  if (pathname === '/api/partner/hotels/query' && req.method === 'GET') {
    const q = query.q;
    
    if (!q) {
      return sendJSON(res, 400, { error: "Please provide 'q' query parameter" });
    }
    
    let results = [];
    
    // Check if input is numeric (likely an ID)
    if (/^\d+$/.test(q)) {
      // Search by ID first
      results = hotels.filter(h => h.propertyId === q);
      // If no ID match, also search by name containing the number
      if (results.length === 0) {
        results = hotels.filter(h => 
          h.propertyName.toLowerCase().includes(q.toLowerCase())
        );
      }
    } else {
      // Search by name
      results = hotels.filter(h => 
        h.propertyName.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    return sendJSON(res, 200, { hotels: addLocalTime(results) });
  }

  // GET /api/partner/contacthistory - Get contact history (8 second delay to demo UI blocking)
  if (pathname === '/api/partner/contacthistory' && req.method === 'GET') {
    const delay = parseInt(query.delay) || 8;

    const contactHistory = {
      history: [
        {
          month: "March 2026",
          contacts: [
            { date: "03 Mar 2026, 21:32", type: "Complaint", subject: "Complaint message from partner", message: "Booking refund not processed after 8 months of follow-up. Request immediate resolution.", sender: "Christian Montua Albers", email: "c.montua@gmx.de" },
            { date: "02 Mar 2026, 15:06", type: "Email", subject: "To property inbox", message: "Guten Tag, vielen Dank dass Sie sich an uns gewandt haben. Sollten Ihnen Unannehmlichkeiten entstanden sein, bitten wir dies zu entschuldigen.", sender: "Susanne Kontopides Thomsen", email: "s.thomsen@booking.com" },
            { date: "02 Mar 2026, 01:35", type: "Security", subject: "Security risk report", message: "Suspicion: account_hacking. Victim: Partner. Property id: 12345. Social media related case: No.", sender: "Hyeok Byun", email: "h.byun@booking.com" }
          ]
        },
        {
          month: "February 2026",
          contacts: [
            { date: "28 Feb 2026, 10:15", type: "Note", subject: "Internal note", message: "Partner contacted regarding rate parity issue. Escalated to account manager.", sender: "Agent Support", email: "support@booking.com" },
            { date: "20 Feb 2026, 14:30", type: "Email", subject: "Reservation cancellation request", message: "Guest requested cancellation for booking ref 40-6372382533. Awaiting property confirmation.", sender: "Guest Services", email: "guestservices@booking.com" }
          ]
        },
        {
          month: "January 2026",
          contacts: [
            { date: "15 Jan 2026, 09:00", type: "Note", subject: "Property onboarding update", message: "XML activation completed. Property is now live on the platform.", sender: "Onboarding Team", email: "onboarding@booking.com" }
          ]
        },
        {
          month: "December 2025",
          contacts: [
            { date: "10 Dec 2025, 16:45", type: "Complaint", subject: "Overbooking complaint", message: "Partner reported overbooking incident during peak season. Compensation discussion pending.", sender: "Partner Relations", email: "partnerrelations@booking.com" }
          ]
        }
      ]
    };

    setTimeout(() => {
      sendJSON(res, 200, contactHistory);
    }, delay * 1000);

    return;
  }

  sendJSON(res, 404, { error: "Endpoint not found" });
}


module.exports = handleRequest;


if (require.main === module) {
  const server = http.createServer(handleRequest);
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
