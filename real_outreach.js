const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const EMAIL_USER = 'team.quantapex@gmail.com';
const EMAIL_PASS = 'lofh qxcv reua clga';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
});

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startOutreach() {
  try {
    console.log("🕵️‍♂️ Starting Real-Time Lead Extraction for Quantapex...");
    console.log("📍 Target Locations: Delhi & Bengaluru");
    console.log("🏢 Target Niche: Real Estate (Needs Website / Uses Gmail)");
    
    const queries = [
      `"real estate broker" "delhi" "@gmail.com"`,
      `"real estate agency" "bengaluru" "@gmail.com"`,
      `"property consultant" "delhi" "@gmail.com"`,
      `"real estate consultant" "bangalore" "@gmail.com"`
    ];

    let allEmails = new Set();

    for (let query of queries) {
      if (allEmails.size >= 20) break;
      
      console.log(`🔎 Searching DDG for: ${query}`);
      const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      
      try {
        const { data } = await axios.get(url, { 
          headers: { 
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" 
          }
        });
        
        const $ = cheerio.load(data);
        const text = $('body').text();
        
        // Extract emails
        const regex = /[a-zA-Z0-9._%+-]+@gmail\.com/g;
        const matches = text.match(regex);
        
        if (matches) {
          matches.forEach(email => {
            // Basic filtering to avoid weird artifacts
            if (email.length > 10 && email.length < 50 && !email.startsWith('example') && !email.startsWith('test')) {
              allEmails.add(email.toLowerCase());
            }
          });
        }
        await sleep(2000); // Prevent ban
      } catch (e) {
        console.error("Search partially blocked or failed, continuing...", e.message);
      }
    }

    const emailList = Array.from(allEmails).slice(0, 20);
    console.log(`\n🎯 Successfully extracted ${emailList.length} REAL email addresses of Real Estate professionals.`);
    console.log("Initiating live email blast...\n");

    let successCount = 0;

    for (let i = 0; i < emailList.length; i++) {
        const targetEmail = emailList[i];
        
        // Custom Email Template for Real Estate
        const mailOptions = {
          from: `"Quantapex Growth" <${EMAIL_USER}>`,
          to: targetEmail,
          subject: `You are losing Real Estate clients in your city (Delhi/Bengaluru)`,
          text: `Hi there,

I am reaching out from Quantapex, a premium Web Development Agency. I noticed your Real Estate business is primarily using a free email address and likely missing a dedicated, high-converting website.

Right now in Delhi & Bengaluru, top real estate agencies are capturing NRI and high-ticket clients because they have interactive, premium 3D websites. Clients trust websites, not just Google listings.

At Quantapex, we build enterprise-grade websites starting from ₹6,999 up to ₹49,999. If you want to stop losing leads to your competitors, we can build a flagship digital presence for your property portfolio.

Can we schedule a 5-minute chat this week?

Best,
The Quantapex Team
https://quantapex.in`
        };

        try {
          console.log(`[${i+1}/${emailList.length}] ✉️ Sending to ${targetEmail}...`);
          await transporter.sendMail(mailOptions);
          console.log(`   ✅ Success! Delivered.`);
          successCount++;
          await sleep(2000); // 2 second delay between emails to avoid spam triggers
        } catch (err) {
          console.error(`   ❌ Failed to send to ${targetEmail}: ${err.message}`);
        }
    }

    console.log(`\n🎉 OUTREACH COMPLETE! Successfully delivered ${successCount} emails to REAL clients in Delhi and Bengaluru.`);
    
  } catch (error) {
    console.error("Critical Error in Outreach:", error);
  }
}

startOutreach();
