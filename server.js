// Local test server - not needed for Vercel deployment
const http = require('http');
const handleRequest = require('./api/index.js');

const PORT = 3000;
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('\nTest endpoints:');
  console.log('  GET http://localhost:3000/api/partner/hotels');
  console.log('  GET http://localhost:3000/api/partner/hotels/search?name=taj');
  console.log('  GET http://localhost:3000/api/partner/hotels/201');
  console.log('  GET http://localhost:3000/api/partner/hotels/country/India');
});
