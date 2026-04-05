const axios = require('axios');
const fs = require('fs');

// Fetch cities from the lib file directly
const citiesContent = fs.readFileSync('./src/lib/cities.ts', 'utf8');
const citiesMatch = citiesContent.match(/id: "([^"]+)"/g);
const cityIds = citiesMatch ? citiesMatch.map(m => m.match(/"([^"]+)"/)[1]) : [];

const BASE_URL = 'https://quantapex.in';

async function pingIndexing() {
  console.log(`🚀 Starting Global Indexing Powerhouse for ${cityIds.length} pages...`);
  
  for (const id of cityIds) {
    const url = `${BASE_URL}/agency/${id}`;
    
    try {
      // Ping Google
      await axios.get(`https://www.google.com/ping?sitemap=${url}`, { timeout: 5000 });
      // Ping Bing
      await axios.get(`https://www.bing.com/ping?sitemap=${url}`, { timeout: 5000 });
      
      console.log(`✅ Ping Sent: ${url}`);
    } catch (err) {
      console.log(`❌ Failed: ${url} (Service might be rate limiting)`);
    }
    
    // Large delay to avoid IP block or rate limiting from Google/Bing
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  
  console.log('🏁 Indexing Request Complete. Google will discover these pages within 24-48 hours.');
}

pingIndexing();
