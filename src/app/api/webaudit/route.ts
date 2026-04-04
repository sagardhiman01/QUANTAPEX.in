import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Target URL required for Design Audit." }, { status: 400 });
    }

    let html = "";
    let status = 200;
    try {
      const response = await fetch(url.startsWith('http') ? url : `https://${url}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WebAuditor/1.0; +https://example.com)' }
      });
      status = response.status;
      html = await response.text();
    } catch (e) {
      return NextResponse.json({ error: "Failed to connect. Site might be highly unstable or blocking crawls." }, { status: 500 });
    }

    const $ = cheerio.load(html);
    
    // Performance & Modern Stack Analysis
    const hasReact = html.includes('data-reactroot') || html.includes('_next/static') || html.includes('__NEXT_DATA__');
    const hasVue = html.includes('data-v-') || html.includes('__NUXT__');
    const hasWp = html.includes('wp-content') || html.includes('wp-includes');
    const isOldTableLayout = $('table').length > 5 && $('div').length < $('table').length;

    let designGrade = "C-";
    let trustScore = 45;
    const roastPoints = [];

    if (hasWp) {
      designGrade = "C";
      trustScore = 60;
      roastPoints.push("Detected WordPress. This means high vulnerability and slower load times compared to modern Headless architectures.");
    } else if (!hasReact && !hasVue) {
      designGrade = "D";
      trustScore = 30;
      roastPoints.push("Running on ancient static HTML/PHP. Users mentally associate this with outdated unreliability.");
    } else if (hasReact || hasVue) {
      designGrade = "B+";
      trustScore = 80;
      roastPoints.push("Using relatively modern JS frameworks, but lacks immersive 3D/GSAP elements that Premium $10K+ clients expect.");
    }

    if (isOldTableLayout) {
      designGrade = "F";
      trustScore = 15;
      roastPoints.push("Using 1999 Table layouts. Immediate redesign required to prevent 99% bounce rates.");
    }

    if ($('video').length === 0 && $('canvas').length === 0) {
      roastPoints.push("Zero dynamic media (No Video/Canvas). Flat, unengaging UI making users leave within 5 seconds.");
    }

    // Quantapex Proposal Engine
    const pitch = `Client Site Grade: ${designGrade}
    
Their problem: Their digital storefront looks fundamentally outdated. In 2026, high-ticket clients buy "Trust" before they buy "Services". This current site hemorrhages trust.

The Quantapex Solution (Pitch this):
"Hi [Name], your current site architecture is actively costing you revenue. At Quantapex, we dismantle flat experiences and build immersive, Next.js-powered 3D environments. We can engineer a digital flagship for you that commands premium pricing. Let's rebuild your authority."`;

    return NextResponse.json({
      success: true,
      designGrade,
      trustScore,
      roastPoints,
      pitch,
      detectedStack: hasReact ? "React/Next.js" : hasVue ? "Vue/Nuxt" : hasWp ? "WordPress" : "Legacy HTML/PHP",
    });

  } catch (err: any) {
    return NextResponse.json({ error: "Audit Error", details: err.message }, { status: 500 });
  }
}
