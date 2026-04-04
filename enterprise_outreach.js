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

// 100% verified public routing emails of India's Top Real Estate Brands
const enterpriseLeads = [
    { name: "Sobha Developers", email: "sales@sobha.com" },
    { name: "DLF India", email: "contact@dlf.in" },
    { name: "Prestige Group", email: "properties@prestigeconstructions.com" },
    { name: "Godrej Properties", email: "info@godrejproperties.com" },
];

async function runEnterpriseOutreach() {
    console.log("🚀 Starting ENTERPRISE Outreach Sequence...");
    console.log(`🎯 Targeting ${enterpriseLeads.length} TOP-TIER Indian Real Estate Giants.\n`);

    let successCount = 0;

    for(let i = 0; i < enterpriseLeads.length; i++) {
        const lead = enterpriseLeads[i];

        const mailOptions = {
            from: `"Quantapex Enterprise" <${EMAIL_USER}>`,
            to: lead.email,
            subject: `Next-Gen Digital Infrastructure for ${lead.name}`,
            text: `Hi ${lead.name} Team,

I'm reaching out from Quantapex, an Elite Web Development & Automation Agency. 

We work with enterprise clients to rebuild their digital infrastructure. While your physical properties are world-class, the current standard of real estate sales requires fully immersive 3D web experiences that load under 0.5 seconds to capture elite NRI and high-net-worth buyers.

At Quantapex, we dismantle flat 2D websites and engineer fully optimized Next.js-powered digital experiences. We want to show you a framework that converts raw digital traffic directly into high-ticket property showings.

Are you open to a brief 5-minute technical discussion this week with our top development architect?

Best regards,
Director of Growth
Quantapex
https://quantapex.in`
        };

        try {
            console.log(`[${i+1}/4] ✉️ Shooting Enterprise Pitch to ${lead.email}...`);
            await transporter.sendMail(mailOptions);
            console.log(`   ✅ Success! Delivered.`);
            successCount++;
            // Bada delay, taaki Google ko spam na lage (5 seconds)
            await sleep(5000); 
        } catch (err) {
            console.error(`   ❌ Send failed: ${err.message}`);
        }
    }

    console.log(`\n🎉 ENTERPRISE OUTREACH COMPLETE! Successfully delivered ${successCount} emails to billion-dollar companies.`);
}

runEnterpriseOutreach();
