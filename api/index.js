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
    },
    "contacts": {
      "name": "Rajesh Sharma",
      "type": "Primary contact for Partner Support",
      "position": "General Manager",
      "preferredLanguage": "English",
      "email": "rajesh.sharma@tajdelhi.com",
      "phone": "+919812345001",
      "mobile": "+919812345002"
    },
    "partnerServices": {
      "accountManagerInternal": "72210045",
      "accountManagerPhone": "72210045",
      "localOfficeName": "New Delhi",
      "status": "Open",
      "cspSupport": "72216200",
      "csEscalation": "72216200"
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
    },
    "contacts": {
      "name": "Priya Patel",
      "type": "Primary contact for Partner Support",
      "position": "Front Office Manager",
      "preferredLanguage": "English",
      "email": "priya.patel@tajmumbai.com",
      "phone": "+919911223001",
      "mobile": "+919911223002"
    },
    "partnerServices": {
      "accountManagerInternal": "72210046",
      "accountManagerPhone": "72210046",
      "localOfficeName": "Mumbai",
      "status": "Open",
      "cspSupport": "72216201",
      "csEscalation": "72216201"
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
    },
    "contacts": {
      "name": "Anand Krishnan",
      "type": "Secondary contact for Reservations",
      "position": "Revenue Manager",
      "preferredLanguage": "English",
      "email": "anand.k@oberoibangalore.com",
      "phone": "+918045678001",
      "mobile": ""
    },
    "partnerServices": {
      "accountManagerInternal": "72210047",
      "accountManagerPhone": "72210047",
      "localOfficeName": "Bangalore",
      "status": "Closed",
      "cspSupport": "72216202",
      "csEscalation": "72216202"
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
    },
    "contacts": {
      "name": "Marco Rossi",
      "type": "Primary contact for Partner Support",
      "position": "Hotel Director",
      "preferredLanguage": "Italian",
      "email": "m.rossi@romapalace.it",
      "phone": "+390612345001",
      "mobile": "+393331234567"
    },
    "partnerServices": {
      "accountManagerInternal": "72210060",
      "accountManagerPhone": "72210060",
      "localOfficeName": "Rome",
      "status": "Open",
      "cspSupport": "72216264",
      "csEscalation": "72216264"
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
    },
    "contacts": {
      "name": "Jan de Vries",
      "type": "Primary contact for Partner Support",
      "position": "Operations Manager",
      "preferredLanguage": "Dutch",
      "email": "j.devries@grandamsterdam.nl",
      "phone": "+31201234001",
      "mobile": "+31612345678"
    },
    "partnerServices": {
      "accountManagerInternal": "72210070",
      "accountManagerPhone": "72210070",
      "localOfficeName": "Amsterdam",
      "status": "Open",
      "cspSupport": "72216270",
      "csEscalation": "72216270"
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
    },
    "contacts": {
      "name": "Sophie Dubois",
      "type": "Primary contact for Partner Support",
      "position": "*unknown*",
      "preferredLanguage": "French",
      "email": "s.dubois@hiltonparis.fr",
      "phone": "+33123456001",
      "mobile": ""
    },
    "partnerServices": {
      "accountManagerInternal": "72210080",
      "accountManagerPhone": "72210080",
      "localOfficeName": "Paris",
      "status": "Closed",
      "cspSupport": "72216280",
      "csEscalation": "72216280"
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
    },
    "contacts": {
      "name": "Vikram Menon",
      "type": "Primary contact for Partner Support",
      "position": "Assistant Manager",
      "preferredLanguage": "English",
      "email": "vikram.menon@tajgoa.com",
      "phone": "+919876543001",
      "mobile": "+919876543002"
    },
    "partnerServices": {
      "accountManagerInternal": "72210048",
      "accountManagerPhone": "72210048",
      "localOfficeName": "Goa",
      "status": "Open",
      "cspSupport": "72216203",
      "csEscalation": "72216203"
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
    },
    "contacts": {
      "name": "Lakshmi Narayanan",
      "type": "Primary contact for Partner Support",
      "position": "Deputy General Manager",
      "preferredLanguage": "English",
      "email": "lakshmi.n@itcchennai.com",
      "phone": "+914412345001",
      "mobile": "+919445123456"
    },
    "partnerServices": {
      "accountManagerInternal": "72210049",
      "accountManagerPhone": "72210049",
      "localOfficeName": "Chennai",
      "status": "Open",
      "cspSupport": "72216204",
      "csEscalation": "72216204"
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
    },
    "contacts": {
      "name": "Deepak Verma",
      "type": "Secondary contact for Reservations",
      "position": "Reservations Manager",
      "preferredLanguage": "English",
      "email": "deepak.verma@itcmaurya.com",
      "phone": "+911123456001",
      "mobile": ""
    },
    "partnerServices": {
      "accountManagerInternal": "72210045",
      "accountManagerPhone": "72210045",
      "localOfficeName": "New Delhi",
      "status": "Open",
      "cspSupport": "72216200",
      "csEscalation": "72216200"
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
    },
    "contacts": {
      "name": "Suresh Iyer",
      "type": "Primary contact for Partner Support",
      "position": "Front Office Manager",
      "preferredLanguage": "English",
      "email": "suresh.iyer@itcmaratha.com",
      "phone": "+912212345001",
      "mobile": "+919820123456"
    },
    "partnerServices": {
      "accountManagerInternal": "72210046",
      "accountManagerPhone": "72210046",
      "localOfficeName": "Mumbai",
      "status": "Open",
      "cspSupport": "72216201",
      "csEscalation": "72216201"
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
    },
    "contacts": {
      "name": "Giovanni Bianchi",
      "type": "Primary contact for Partner Support",
      "position": "Owner",
      "preferredLanguage": "Italian",
      "email": "g.bianchi@veneziagrand.it",
      "phone": "+390412345001",
      "mobile": "+393387654321"
    },
    "partnerServices": {
      "accountManagerInternal": "72210061",
      "accountManagerPhone": "72210061",
      "localOfficeName": "Venice",
      "status": "Open",
      "cspSupport": "72216265",
      "csEscalation": "72216265"
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
    },
    "contacts": {
      "name": "Pierre Laurent",
      "type": "Primary contact for Partner Support",
      "position": "Hotel Manager",
      "preferredLanguage": "French",
      "email": "p.laurent@lemarais.fr",
      "phone": "+33145678001",
      "mobile": "+33612345678"
    },
    "partnerServices": {
      "accountManagerInternal": "72210081",
      "accountManagerPhone": "72210081",
      "localOfficeName": "Paris",
      "status": "Open",
      "cspSupport": "72216280",
      "csEscalation": "72216280"
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
    },
    "contacts": {
      "name": "Claire Moreau",
      "type": "Secondary contact for Reservations",
      "position": "Revenue Director",
      "preferredLanguage": "French",
      "email": "c.moreau@niceriviera.fr",
      "phone": "+33493123001",
      "mobile": "+33698765432"
    },
    "partnerServices": {
      "accountManagerInternal": "72210082",
      "accountManagerPhone": "72210082",
      "localOfficeName": "Nice",
      "status": "Open",
      "cspSupport": "72216281",
      "csEscalation": "72216281"
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
    },
    "contacts": {
      "name": "Emma van den Berg",
      "type": "Primary contact for Partner Support",
      "position": "General Manager",
      "preferredLanguage": "Dutch",
      "email": "e.vandenberg@canalview.nl",
      "phone": "+31206789001",
      "mobile": "+31623456789"
    },
    "partnerServices": {
      "accountManagerInternal": "72210071",
      "accountManagerPhone": "72210071",
      "localOfficeName": "Amsterdam",
      "status": "Open",
      "cspSupport": "72216271",
      "csEscalation": "72216271"
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
    
    // TEMPORARY - 4 second delay for blocking demo (REMOVE AFTER TESTING)
    setTimeout(() => {
      sendJSON(res, 200, { hotels: addLocalTime(results) });
    }, 4000);
    return;
  }

  // GET /api/partner/dummy - Simple response with 3 second delay (TEMPORARY - remove after testing)
  if (pathname === '/api/partner/dummy' && req.method === 'GET') {
    const data = {
      body: "We received this complaint. Wrong furniture was delivered to the guest room. The guest has requested an immediate replacement and a partial refund for the inconvenience caused."
    };

    setTimeout(() => {
      sendJSON(res, 200, data);
    }, 9000);

    return;
  }

  // GET /api/partner/contacthistory - Get contact history (3 second delay to demo UI blocking)
  if (pathname === '/api/partner/contacthistory' && req.method === 'GET') {
    const delay = parseInt(query.delay) || 3;

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
