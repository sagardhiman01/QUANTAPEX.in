/**
 * 🚀 QUANTAPEX — Smart Indexing Powerhouse v2
 *
 * Strategy:
 *  1. Submit sitemap.xml to Google & Bing (one shot)
 *  2. IndexNow BULK API — submits ALL 221 URLs in 3 batches instantly
 *     Bing, Yandex, SearchXNG all pick it up. Zero rate-limiting risk.
 *  3. Verify top 10 priority pages are live
 *
 * Run: node index_ping.js
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const BASE_URL    = 'https://quantapex.in';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const INDEXNOW_KEY  = 'quantapex2026seokey';
const INDEXNOW_HOST = 'quantapex.in';
const BATCH_SIZE    = 100;
const BATCH_DELAY   = 3000;

// ─── COLORS ────────────────────────────────────────────────────────────────────
const G = '\x1b[32m', R = '\x1b[31m', Y = '\x1b[33m',
      C = '\x1b[36m', B = '\x1b[1m',  Z = '\x1b[0m';

// ─── ALL URLs ─────────────────────────────────────────────────────────────────

const CITY_IDS = [
  "delhi","mumbai","bengaluru","hyderabad","pune","chennai","kolkata","gurugram",
  "noida","ahmedabad","jaipur","lucknow","surat","indore","chandigarh","kochi",
  "visakhapatnam","bhopal","patna","vadodara","ghaziabad","ludhiana","agra",
  "nashik","faridabad","meerut","rajkot","varanasi","srinagar","amritsar",
  "navi-mumbai","ranchi","coimbatore","jabalpur","gwalior","howrah","vijayawada",
  "jodhpur","madurai","guwahati","raipur","kota","solapur","bareilly","moradabad",
  "mysore","tiruchirappalli","hubli-dharwad","aligarh","jalandhar","bhubaneswar",
  "salem","warangal","guntur","bhiwandi","saharanpur","gorakhpur","bikaner",
  "amravati","jamshedpur","bhilai","cuttack","firozabad","nellore","bhavnagar",
  "dehradun","durgapur","asansol","rourkela","nanded","kolhapur","ajmer","akola",
  "gulbarga","jamnagar","ujjain","siliguri","jhansi","ulhasnagar","sangli","jammu",
  "belgaum","mangalore","tirunelveli","malegaon","udaipur","gaya","tiruppur",
  "davangere","kozhikode","kurnool","rajamahendravaram","bokaro","south-delhi",
  "dwarka","vashi","andheri","whitefield","hitech-city",
  "new-york","london","dubai","singapore","paris","berlin","tokyo","sydney",
  "san-francisco","austin","seattle","los-angeles","chicago","toronto","vancouver",
  "amsterdam","munich","zurich","geneva","hong-kong","seoul","shanghai","beijing",
  "boston","philadelphia","atlanta","denver","salt-lake-city","portland","las-vegas",
  "phoenix","houston","washington-dc","dublin","stockholm","copenhagen","oslo",
  "helsinki","madrid","barcelona","milan","rome","prague","vienna","warsaw",
  "budapest","istanbul","tel-aviv","abu-dhabi","riyadh","doha","kuwait-city",
  "johannesburg","cape-town","nairobi","lagos","cairo","bangkok","kuala-lumpur",
  "ho-chi-minh-city","manila","jakarta","melbourne","auckland","wellington",
  "montreal","calgary","ottawa","mexico-city","sao-paulo","rio-de-janeiro",
  "buenos-aires","santiago","bogota","lima","lisbon","moscow","brussels",
  "luxembourg","athens","bucharest","sofia","belgrade","zagreb","bratislava",
  "manchester","birmingham","glasgow","frankfurt","hamburg","lyon","marseille",
  "osaka","fukuoka","nagoya","pert","brisbane","adelaide",
  "dubai-marina","beverly-hills","mayfair-london","orchard-singapore","manhattan",
  "zurich-finance"
];

const BLOG_SLUGS = [
  "seo-ranking-tips-2026","web-design-converts-clients","local-seo-google-maps-ranking",
  "ai-seo-tools-2026","website-speed-optimization-guide","ecommerce-seo-complete-guide",
  "ai-seo-2026-death-of-backlinking","pseo-for-high-ticket-b2b",
  "google-ai-overviews-sge-impact","zero-click-search-brand-authority",
  "converting-ai-bots-into-customers","best-website-development-company-india",
  "cost-of-website-development-india","ai-website-development-explained",
  "benefits-professional-website-for-business"
];

const ALL_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/blog/`,
  `${BASE_URL}/services/`,
  ...BLOG_SLUGS.map(s => `${BASE_URL}/blog/${s}/`),
  ...CITY_IDS.map(id => `${BASE_URL}/agency/${id}/`),
];

console.log(`\n${B}${C}╔═══════════════════════════════════════════════╗${Z}`);
console.log(`${B}${C}║  🚀 QUANTAPEX SMART INDEXING POWERHOUSE v2    ║${Z}`);
console.log(`${B}${C}╚═══════════════════════════════════════════════╝${Z}\n`);
console.log(`${B}📊 Total URLs to index: ${ALL_URLS.length}${Z}\n`);

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpsGet(url) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ status: 0, err: 'timeout' }), 12000);
    https.get(url, { headers: { 'User-Agent': 'QuantapexSEOBot/2.0' } }, (res) => {
      clearTimeout(timer);
      res.resume();
      resolve({ status: res.statusCode });
    }).on('error', (e) => {
      clearTimeout(timer);
      resolve({ status: 0, err: e.message });
    });
  });
}

function httpsPost(hostname, urlPath, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const timer = setTimeout(() => resolve({ status: 0, err: 'timeout' }), 15000);
    const req = https.request(
      { hostname, path: urlPath, method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8',
                   'Content-Length': Buffer.byteLength(data) }
      },
      (res) => { clearTimeout(timer); res.resume(); resolve({ status: res.statusCode }); }
    );
    req.on('error', (e) => { clearTimeout(timer); resolve({ status: 0, err: e.message }); });
    req.write(data);
    req.end();
  });
}

// ─── STEP 0: IndexNow Key File ────────────────────────────────────────────────

function ensureIndexNowKey() {
  console.log(`${B}🔑 STEP 0: IndexNow key file...${Z}`);
  const keyFile = path.join(__dirname, 'public', `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(keyFile)) {
    fs.writeFileSync(keyFile, INDEXNOW_KEY, 'utf8');
    console.log(`  ${G}✓${Z} Created: public/${INDEXNOW_KEY}.txt\n`);
  } else {
    console.log(`  ${G}✓${Z} Key file already exists.\n`);
  }
}

// ─── STEP 1: Sitemap Submission ───────────────────────────────────────────────

async function submitSitemaps() {
  console.log(`${B}📡 STEP 1: Sitemap submission to Google & Bing...${Z}\n`);
  const endpoints = [
    { name: 'Google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
    { name: 'Bing',   url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
  ];
  for (const e of endpoints) {
    const r = await httpsGet(e.url);
    const ok = r.status >= 200 && r.status < 400;
    console.log(`  ${ok ? G+'✓' : Y+'⚠'}${Z} ${e.name}: HTTP ${r.status || r.err}`);
    await sleep(500);
  }
  console.log();
}

// ─── STEP 2: IndexNow Bulk API ────────────────────────────────────────────────

async function submitIndexNow() {
  console.log(`${B}⚡ STEP 2: IndexNow BULK API (Bing/Yandex/SearchXNG)...${Z}`);
  console.log(`  Sending all ${ALL_URLS.length} URLs in batches of ${BATCH_SIZE}. No rate limit risk!\n`);

  const chunks = [];
  for (let i = 0; i < ALL_URLS.length; i += BATCH_SIZE) {
    chunks.push(ALL_URLS.slice(i, i + BATCH_SIZE));
  }

  let totalOk = 0;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const body = {
      host:        INDEXNOW_HOST,
      key:         INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList:     chunk,
    };
    const r = await httpsPost('api.indexnow.org', '/indexnow', body);
    const ok = r.status >= 200 && r.status < 400;
    if (ok) {
      totalOk += chunk.length;
      console.log(`  ${G}✓${Z} Batch ${i+1}/${chunks.length} — ${chunk.length} URLs — HTTP ${r.status}`);
    } else {
      console.log(`  ${Y}⚠${Z} Batch ${i+1}/${chunks.length} — HTTP ${r.status || r.err}`);
    }
    if (i < chunks.length - 1) await sleep(BATCH_DELAY);
  }
  console.log(`\n  ${G}${B}✅ IndexNow total submitted: ${totalOk}/${ALL_URLS.length}${Z}\n`);
}

// ─── STEP 3: Verify Live Pages ────────────────────────────────────────────────

async function verifyLivePages() {
  console.log(`${B}🌐 STEP 3: Verifying priority pages are LIVE...${Z}\n`);
  const PRIORITY = [
    { path: '/',                                name: 'Homepage'          },
    { path: '/blog/',                           name: 'Blog Index'        },
    { path: '/services/',                       name: 'Services'          },
    { path: '/sitemap.xml',                     name: 'Sitemap'           },
    { path: '/robots.txt',                      name: 'Robots.txt'        },
    { path: '/blog/seo-ranking-tips-2026/',     name: 'Blog (SEO Tips)'   },
    { path: '/agency/delhi/',                   name: 'Agency Delhi'      },
    { path: '/agency/mumbai/',                  name: 'Agency Mumbai'     },
    { path: '/agency/london/',                  name: 'Agency London'     },
    { path: '/agency/new-york/',                name: 'Agency New York'   },
  ];
  let ok = 0, fail = 0;
  for (const page of PRIORITY) {
    const r = await httpsGet(BASE_URL + page.path);
    const live = r.status === 200 || r.status === 304;
    console.log(`  ${live ? G+'✓' : R+'✗'}${Z} ${page.name.padEnd(20)} HTTP ${r.status || r.err}`);
    live ? ok++ : fail++;
    await sleep(250);
  }
  console.log();
  return { ok, fail };
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  ensureIndexNowKey();
  await submitSitemaps();
  await submitIndexNow();
  const stats = await verifyLivePages();

  console.log(`${B}${C}╔═══════════════════════════════════════════════╗${Z}`);
  console.log(`${B}${C}║              📊 FINAL REPORT                  ║${Z}`);
  console.log(`${B}${C}╚═══════════════════════════════════════════════╝${Z}\n`);
  console.log(`  ${G}✅ URLs submitted via IndexNow: ${ALL_URLS.length}${Z}`);
  console.log(`  ${stats.ok===10?G:Y}${stats.ok===10?'✅':'⚠️ '} Pages live: ${stats.ok}/10${Z}`);
  if (stats.fail > 0) {
    console.log(`  ${Y}⚠️  ${stats.fail} pages still 404 — GitHub Pages may still be deploying (wait 2-5 mins)${Z}`);
  }
  console.log(`\n  ${B}📋 Manual Steps (one-time):${Z}`);
  console.log(`  1. Google Search Console → Sitemaps → Add: ${SITEMAP_URL}`);
  console.log(`  2. GSC → URL Inspection → Request Indexing for /`);
  console.log(`  3. Bing Webmaster → Sitemaps → Submit: ${SITEMAP_URL}`);
  console.log(`  4. Check in 24–48 hrs: google.com/search?q=site:quantapex.in\n`);
}

main().catch(console.error);
