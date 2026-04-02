import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

function getKeywords(text: string) {
  const words = text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/);
  const skipWords = new Set(["the", "and", "a", "an", "is", "it", "to", "in", "for", "of", "with", "on", "that", "this", "by", "as", "at", "be", "we", "you", "are", "or", "from", "your", "our", "all", "can", "will"]);
  const map = new Map<string, number>();
  
  words.forEach(w => {
    if (w.length > 3 && !skipWords.has(w)) {
      map.set(w, (map.get(w) || 0) + 1);
    }
  });
  
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(i => i[0]);
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "Rival URL is required" }, { status: 400 });
    }

    let html = "";
    try {
      const response = await fetch(url.startsWith('http') ? url : `https://${url}`, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GrandmasterSEO/1.0; +https://example.com)' }
      });
      html = await response.text();
    } catch (e) {
      return NextResponse.json({ error: "Failed to penetrate rival website." }, { status: 500 });
    }

    const $ = cheerio.load(html);
    
    const title = $('title').text() || "Hidden";
    const h1s = $('h1').map((_, el) => $(el).text().trim()).get();
    const h2s = $('h2').map((_, el) => $(el).text().trim()).get();
    
    const bodyText = $('body').text();
    const topKeywords = getKeywords(bodyText);

    const theftStrategy = `Our X-Ray scan reveals that your competitor heavily relies on the keyword cluster: [${topKeywords.slice(0,3).join(', ')}]. To steal their traffic, immediately restructure your H2 tags to answer user intents better than their current H1: "${h1s[0] || 'N/A'}". Embed 3x more multimedia assets formatted around [${topKeywords[0]}].`;

    return NextResponse.json({
      title,
      h1s,
      h2s: h2s.slice(0, 5), // Limit to top 5
      topKeywords,
      theftStrategy
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Spy Engine Error", details: err.message }, { status: 500 });
  }
}
