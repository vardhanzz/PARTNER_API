const http = require('http');
const url = require('url');

// Hotel data
const hotels = [
  {
    "propertyId": "201",
    "propertyName": "Taj Delhi",
    "country": "India",
    "email": "tajdelhi@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919812345678",
    "address": "New Delhi"
  },
  {
    "propertyId": "202",
    "propertyName": "Taj Mumbai",
    "country": "India",
    "email": "tajmumbai@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919911223344",
    "address": "Mumbai"
  },
  {
    "propertyId": "203",
    "propertyName": "Oberoi Bangalore",
    "country": "India",
    "email": "oberoi@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+918045678901",
    "address": "Bangalore"
  },
  {
    "propertyId": "204",
    "propertyName": "Hotel Roma Palace",
    "country": "Italy",
    "email": "roma@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+390612345678",
    "address": "Rome"
  },
  {
    "propertyId": "205",
    "propertyName": "Grand Amsterdam Stay",
    "country": "Netherlands",
    "email": "amsterdam@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+31201234567",
    "address": "Amsterdam"
  },
  {
    "propertyId": "206",
    "propertyName": "Hilton Paris Center",
    "country": "France",
    "email": "paris@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+33123456789",
    "address": "Paris"
  }
];

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

// Request handler
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // GET /api/partner/hotels - Get all hotels
  if (pathname === '/api/partner/hotels' && req.method === 'GET') {
    return sendJSON(res, 200, { hotels });
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
    return sendJSON(res, 200, { hotels: results });
  }

  // GET /api/partner/hotels/country/:country - Get hotels by country
  const countryMatch = pathname.match(/^\/api\/partner\/hotels\/country\/(.+)$/);
  if (countryMatch && req.method === 'GET') {
    const country = decodeURIComponent(countryMatch[1]);
    const results = hotels.filter(hotel =>
      hotel.country.toLowerCase() === country.toLowerCase()
    );
    return sendJSON(res, 200, { hotels: results });
  }

  // GET /api/partner/hotels/:id - Get hotel by ID
  const idMatch = pathname.match(/^\/api\/partner\/hotels\/(\d+)$/);
  if (idMatch && req.method === 'GET') {
    const id = idMatch[1];
    const hotel = hotels.find(h => h.propertyId === id);
    if (!hotel) {
      return sendJSON(res, 404, { error: "Hotel not found" });
    }
    return sendJSON(res, 200, { hotel });
  }

  // 404 Not Found
  sendJSON(res, 404, { error: "Endpoint not found" });
}

// Export for Vercel serverless
module.exports = handleRequest;

// For local testing
if (require.main === module) {
  const server = http.createServer(handleRequest);
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
