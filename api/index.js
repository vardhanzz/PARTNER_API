const express = require('express');
const app = express();

app.use(express.json());

// Hotel data
const hotels = [
  {
    "propertyId": 201,
    "propertyName": "Taj Delhi",
    "country": "India",
    "email": "tajdelhi@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919812345678",
    "address": "New Delhi"
  },
  {
    "propertyId": 202,
    "propertyName": "Taj Mumbai",
    "country": "India",
    "email": "tajmumbai@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+919911223344",
    "address": "Mumbai"
  },
  {
    "propertyId": 203,
    "propertyName": "Oberoi Bangalore",
    "country": "India",
    "email": "oberoi@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+918045678901",
    "address": "Bangalore"
  },
  {
    "propertyId": 204,
    "propertyName": "Hotel Roma Palace",
    "country": "Italy",
    "email": "roma@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+390612345678",
    "address": "Rome"
  },
  {
    "propertyId": 205,
    "propertyName": "Grand Amsterdam Stay",
    "country": "Netherlands",
    "email": "amsterdam@hotel.com",
    "status": "OPEN FOR BOOKING",
    "phone": "+31201234567",
    "address": "Amsterdam"
  },
  {
    "propertyId": 206,
    "propertyName": "Hilton Paris Center",
    "country": "France",
    "email": "paris@hotel.com",
    "status": "CLOSED FOR BOOKING",
    "phone": "+33123456789",
    "address": "Paris"
  }
];

// GET /api/partner/hotels - Get all hotels
app.get('/api/partner/hotels', (req, res) => {
  res.json({ hotels });
});

// GET /api/partner/hotels/search?name=taj - Search hotels by name
app.get('/api/partner/hotels/search', (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: "Please provide 'name' query parameter" });
  }
  
  const results = hotels.filter(hotel => 
    hotel.propertyName.toLowerCase().includes(name.toLowerCase())
  );
  
  res.json({ hotels: results });
});

// GET /api/partner/hotels/:id - Get hotel by ID
app.get('/api/partner/hotels/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const hotel = hotels.find(h => h.propertyId === id);
  
  if (!hotel) {
    return res.status(404).json({ error: "Hotel not found" });
  }
  
  res.json({ hotel });
});

// GET /api/partner/hotels/country/:country - Get hotels by country
app.get('/api/partner/hotels/country/:country', (req, res) => {
  const { country } = req.params;
  const results = hotels.filter(hotel => 
    hotel.country.toLowerCase() === country.toLowerCase()
  );
  
  res.json({ hotels: results });
});

// Export for Vercel
module.exports = app;
