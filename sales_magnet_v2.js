const googleIt = require('google-it');
const nodemailer = require('nodemailer');
const axios = require('axios');
const cheerio = require('cheerio');

const EMAIL_USER = 'team.quantapex@gmail.com';
const EMAIL_PASS = 'lofh qxcv reua clga';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function auditSite(url) {
  try {
    const res = await axios.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 5000 
    });
    const html = res.data;
    const $ = cheerio.load(html);
    
    // Simple Audit Heuristics (Like webaudit API)
    const isWp = html.includes('wp-content');
    const isVeryOld = !html.includes('react') && !html.includes('next');
    const hasVideo = $('video').length > 0;
    
    let score = isWp ? 60 : (isVeryOld ? 40 : 85);
    if (!hasVideo) score -= 10;
    
    return { score, isWp, isVeryOld };
  } catch (e) {
    return { score: 0, error: true };
  }
}

async function startHighTicketOutreach() {
  const niches = [
    { query: '"real estate" "london" "@gmail.com"', location: 'London' },
    { query: '"interior design" "dubai" "@gmail.com"', location: 'Dubai' },
    { query: '"property dealer" "mumbai" "@gmail.com"', location: 'Mumbai' },
    { query: '"clothing brand" "delhi" "@gmail.com"', location: 'Delhi' },
    { query: '"boutique" "bangalore" "@gmail.com"', location: 'Bangalore' }
  ];

  console.log("💎 Starting High-Ticket Sales Magnet v2...");

  for (let niche of niches) {
    console.log(`🔎 Scouring ${niche.location} for premium targets...`);
    try {
      const results = await googleIt({ 'query': niche.query, 'disableConsole': true });
      console.log(`📊 Found ${results.length} search results.`);
      
      for (const res of results) {
        const text = (res.title + " " + res.snippet).toLowerCase();
        // More comprehensive email regex
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@gmail\.com/g);
        
        if (emailMatch) {
          const targetEmail = emailMatch[0];
          console.log(`🎯 Targeted: ${targetEmail}`);
          
          const mailOptions = {
            from: `"Quantapex Growth" <${EMAIL_USER}>`,
            to: targetEmail,
            subject: `Critical Report: Your digital authority in ${niche.location}`,
            text: `Hi there,

I am from the Quantapex Growth Team (https://quantapex.in).

I noticed you are one of the key players in the ${niche.location} market. However, while your competitors are moving to immersive 3D, Next.js 15 architectures, your current online footprint is likely losing you high-ticket clients who value "Trust" and "Premium Presentation".

We just launched our PSEO engine in ${niche.location} and are looking to partner with ONE elite business to help them dominate the search results. Our sites currently maintain a 100/100 SEO score on Google.

Check our live performance here: https://quantapex.in/agency/${niche.location.toLowerCase()}

If you'd like us to build a digital showroom for your business that justifies premium pricing, reply to this email for a 5-minute discovery call.

Best,
Quantapex Team
https://quantapex.in`
          };

          try {
            console.log(`✉️ Sending Outreach to: ${targetEmail}`);
            await transporter.sendMail(mailOptions);
            await sleep(10000); // 10 sec cooldown to stay safe
          } catch (err) {
            console.log(`❌ Failed to send: ${err.message}`);
          }
        }
      }
    } catch (e) {
      console.log(`❌ Search failed for ${niche.location}: ${e.message}`);
    }
  }
}

startHighTicketOutreach();
