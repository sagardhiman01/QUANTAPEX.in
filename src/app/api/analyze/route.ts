import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url, businessDesc } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Attempt to scrape the website
    let html = "";
    let status = 200;
    let loadTimeMs = 0;
    try {
      const startTime = Date.now();
      const response = await fetch(url.startsWith('http') ? url : `https://${url}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; GrandmasterSEO/1.0; +https://example.com)',
        },
        next: { revalidate: 3600 }
      });
      status = response.status;
      html = await response.text();
      loadTimeMs = Date.now() - startTime;
    } catch (e) {
      return NextResponse.json({ error: "Failed to fetch website. It may be blocking crawlers." }, { status: 500 });
    }

    const $ = cheerio.load(html);
    
    // SEO Data extraction
    const title = $('title').text() || "";
    const metaDescription = $('meta[name="description"]').attr('content') || "";
    const h1Count = $('h1').length;
    const h1Text = $('h1').first().text().trim();
    const h2Count = $('h2').length;
    const imagesCount = $('img').length;
    const imagesWithAlt = $('img[alt]').length;
    
    // Scoring Logic
    let score = 100;
    const opportunities: string[] = [];

    if (!title || title.length < 10) {
      score -= 15;
      opportunities.push("Add a descriptive, keyword-rich Title Tag (50-60 chars).");
    }
    if (!metaDescription || metaDescription.length < 50) {
      score -= 15;
      opportunities.push("Improve Meta Description to boost CTR in search results (150-160 chars).");
    }
    if (h1Count === 0) {
      score -= 20;
      opportunities.push("Missing H1 tag. Add exactly one H1 tag identifying the page's main topic.");
    } else if (h1Count > 1) {
      score -= 5;
      opportunities.push("Multiple H1 tags found. Consider using only one H1 for optimal structure.");
    }
    if (imagesCount > imagesWithAlt) {
      const missingAlt = imagesCount - imagesWithAlt;
      score -= 5;
      opportunities.push(`Found ${missingAlt} image(s) missing alt attributes. Add descriptive alt text.`);
    }
    if (status !== 200) {
      score -= 30;
      opportunities.push(`Site returned status ${status}. Fix server response.`);
    }

    // Add generic modern SEO techniques
    if (score >= 80) {
      opportunities.push("Implement Schema Markup (JSON-LD) for rich snippets.");
    }

    // AI/Context Simulation (Using provided Business description)
    let aiAnalysis = `Based on the technical metrics, your page titled "${title}" has a baseline SEO score of ${Math.max(0, score)}. `;
    
    if (businessDesc && businessDesc.length > 10) {
      aiAnalysis += `Aligning this with your business context: "${businessDesc.substring(0, 100)}...", we recommend restructuring your H1 (${h1Text || 'Missing'}) to directly address your target audience. Your content should focus on semantic keyword clustering around your core business offerings to dominate the SERP.`;
    } else {
      aiAnalysis += `You did not provide a specific business context. To build an 'unbreakable' organic ranking strategy, you must align your content pillars with your actual customer pain points. Ensure the ${h2Count} H2 tags logically break down your services.`;
    }

    // Market Analysis Calculations
    const marketPosition = score >= 90 ? "Top 3 (Dominant)" 
      : score >= 75 ? "Page 1-2 (Competitive)"
      : score >= 50 ? "Page 2-5 (Invisible)" 
      : "Unranked (Deep Search)";

    const growthProjection = score >= 90 ? "+15% (Optimized)" 
      : score >= 70 ? "+45% (High Potential)"
      : "+120% (Massive Upside)";

    const marketPerformance = score >= 80 
      ? "Strong baseline. Your site is technically sound and ready for aggressive backlinking and content scaling."
      : "Weak foundation. Competitors are outranking you due to missing core SEO signals.";

    const actionPlanNextSteps = [
      "Wait 72-96 hours for Google Bot to Index the new SEO GitHub changes.",
      "Submit the updated sitemap (sitemap.xml) directly to Google Search Console.",
      "Begin establishing high-DR backlinks based on your contextual core service keywords."
    ];

    // Core Web Vitals Simulation
    const perfScore = Math.max(0, 100 - (loadTimeMs > 1000 ? Math.floor((loadTimeMs - 1000) / 100) : 0));

    // Backlink Email Outreach Generator
    const targetNiche = businessDesc ? businessDesc.split(' ')[0] : 'Digital';
    const outreachEmail = `Subject: Quick question about your ${targetNiche} content

Hi [Name],

I was doing some research on ${targetNiche} strategies and found your article on [Their Topic]. I loved your insight on [Specific Detail]!

I recently published a comprehensive piece that expands on this, specifically covering [Your Unique Angle]. I think it would make a highly valuable addition to your article for your readers.

Would you be open to me sending the link over to review?

Best,
[Your Name]`;

    return NextResponse.json({
      score: Math.max(0, score),
      marketPosition,
      growthProjection,
      marketPerformance,
      actionPlanNextSteps,
      performance: {
        loadTimeMs,
        score: perfScore,
      },
      outreachEmail,
      summary: score >= 80 ? "Excellent technical foundation." : score >= 50 ? "Needs significant improvement." : "Critical SEO errors detected.",
      opportunities,
      businessAIAnalysis: aiAnalysis,
      metrics: {
        title,
        hasMetaDesc: !!metaDescription,
        h1Count,
        h2Count,
        imageRatio: `${imagesWithAlt}/${imagesCount}`
      }
    });

  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: "Internal Server Error", details: message }, { status: 500 });
  }
}
