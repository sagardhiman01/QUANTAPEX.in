/**
 * 🚀 QUANTAPEX — Google Index Ping & Search Console Submission Tool
 * 
 * This script pings search engines to crawl your new/updated pages.
 * Run after deploying new content:  node ping_all_pages.js
 * 
 * What it does:
 * 1. Submits sitemap to Google, Bing, Yandex
 * 2. Pings all blog pages individually
 * 3. Pings all city landing pages
 * 4. Reports submission results
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'https://quantapex.in';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

// Color codes for terminal
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`\n${BOLD}${CYAN}╔═══════════════════════════════════════════╗${RESET}`);
console.log(`${BOLD}${CYAN}║   🚀 QUANTAPEX SEARCH INDEX BLASTER      ║${RESET}`);
console.log(`${BOLD}${CYAN}╚═══════════════════════════════════════════╝${RESET}\n`);

// URLs to ping
const PRIORITY_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/seo-ranking-tips-2026`,
  `${BASE_URL}/blog/web-design-converts-clients`,
  `${BASE_URL}/blog/local-seo-google-maps-ranking`,
  `${BASE_URL}/blog/ai-seo-tools-2026`,
  `${BASE_URL}/blog/website-speed-optimization-guide`,
  `${BASE_URL}/blog/ecommerce-seo-complete-guide`,
  `${BASE_URL}/agency/delhi`,
  `${BASE_URL}/agency/mumbai`,
  `${BASE_URL}/agency/bengaluru`,
  `${BASE_URL}/agency/dubai`,
  `${BASE_URL}/agency/london`,
  `${BASE_URL}/agency/new-york`,
  `${BASE_URL}/agency/singapore`,
  `${BASE_URL}/agency/hyderabad`,
  `${BASE_URL}/agency/pune`,
  `${BASE_URL}/agency/chennai`,
  `${BASE_URL}/agency/kolkata`,
];

// Search engine ping endpoints
const PING_SERVICES = [
  {
    name: 'Google',
    url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'Bing',
    url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  },
  {
    name: 'IndexNow (Bing/Yandex/SearchXNG)',
    url: `https://api.indexnow.org/indexnow?url=${encodeURIComponent(BASE_URL)}&key=quantapex2026`
  }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, 10000);

    const req = client.get(url, (res) => {
      clearTimeout(timeout);
      resolve({ status: res.statusCode, url });
    });

    req.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

async function pingSearchEngines() {
  console.log(`${BOLD}📡 STEP 1: Submitting sitemap to search engines...${RESET}\n`);
  
  for (const service of PING_SERVICES) {
    try {
      const result = await makeRequest(service.url);
      const statusColor = result.status < 300 ? GREEN : YELLOW;
      console.log(`  ${statusColor}✓${RESET} ${service.name}: HTTP ${result.status}`);
    } catch (err) {
      console.log(`  ${YELLOW}⚠${RESET} ${service.name}: ${err.message} (might still work)`);
    }
    // Small delay
    await new Promise(r => setTimeout(r, 300));
  }
}

async function checkPageIndexability() {
  console.log(`\n${BOLD}🌐 STEP 2: Checking page accessibility...${RESET}\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const url of PRIORITY_URLS) {
    try {
      const result = await makeRequest(url);
      if (result.status === 200 || result.status === 304) {
        console.log(`  ${GREEN}✓${RESET} ${url.replace(BASE_URL, '')} — ${GREEN}LIVE${RESET}`);
        success++;
      } else {
        console.log(`  ${YELLOW}⚠${RESET} ${url.replace(BASE_URL, '')} — HTTP ${result.status}`);
        failed++;
      }
    } catch (err) {
      console.log(`  ${RED}✗${RESET} ${url.replace(BASE_URL, '')} — ${err.message}`);
      failed++;
    }
    await new Promise(r => setTimeout(r, 200));
  }
  
  return { success, failed };
}

function printReport(stats) {
  console.log(`\n${BOLD}${CYAN}╔═══════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${CYAN}║            📊 SUBMISSION REPORT           ║${RESET}`);
  console.log(`${BOLD}${CYAN}╚═══════════════════════════════════════════╝${RESET}`);
  console.log(`\n  ${GREEN}✅ Pages Live: ${stats.success}${RESET}`);
  if (stats.failed > 0) {
    console.log(`  ${YELLOW}⚠️  Issues:     ${stats.failed}${RESET}`);
  }
  console.log(`\n  ${BOLD}Next Steps:${RESET}`);
  console.log(`  1. Go to Google Search Console → Request Indexing for /blog`);
  console.log(`  2. Submit sitemap: ${SITEMAP_URL}`);
  console.log(`  3. Check Core Web Vitals in 24-48 hours`);
  console.log(`  4. Share blog posts on LinkedIn/Twitter for backlinks`);
  console.log(`\n  ${CYAN}Sitemap: ${SITEMAP_URL}${RESET}`);
  console.log(`  ${CYAN}Blog: ${BASE_URL}/blog${RESET}\n`);
}

async function main() {
  await pingSearchEngines();
  const stats = await checkPageIndexability();
  printReport(stats);
}

main().catch(console.error);
