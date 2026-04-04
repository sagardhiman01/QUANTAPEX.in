import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { token, repoFullName, url, businessDesc } = await req.json();

    if (!token || !repoFullName || !url) {
      return NextResponse.json({ error: "Token, Repo URL, and Target URL are required" }, { status: 400 });
    }

    const [owner, repo] = repoFullName.replace("https://github.com/", "").split("/");
    if (!owner || !repo) {
      return NextResponse.json({ error: "Invalid repository format. Use 'username/repo'." }, { status: 400 });
    }

    // 1. Initialize GitHub Client
    const octokit = new Octokit({ auth: token });
    
    // 🔍 FILE DISCOVERY PHASE (Universal Ranking)
    let targetFilePath = 'index.html';
    let fileData: any;
    let isNextJs = false;

    async function tryFetch(path: string) {
      try {
        const res = await octokit.rest.repos.getContent({ owner, repo, path });
        return res.data;
      } catch (e) {
        return null;
      }
    }

    fileData = await tryFetch(targetFilePath);
    if (!fileData) {
      targetFilePath = 'src/app/layout.tsx'; // Fallback to Next.js Architecture
      fileData = await tryFetch(targetFilePath);
      if (fileData) isNextJs = true;
    }

    if (!fileData) {
      return NextResponse.json({ error: "Could not find a valid SEO entry point (index.html or src/app/layout.tsx)." }, { status: 404 });
    }

    // Decode Base64 Content
    const originalContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    let updatedContent = "";

    // 🚀 SEO GENERATION ENGINE
    const newTitle = businessDesc ? `${url.replace('https://', '').split('.')[0].toUpperCase()} | Top ${businessDesc.split(' ').slice(0, 3).join(' ')} Agency` : `${url.replace('https://', '').split('.')[0].toUpperCase()} - Pro SEO Ranking`;
    const newDesc = businessDesc ? `Leading the digital landscape. ${businessDesc.substring(0, 100)}...` : "We provide the best digital SEO strategies and full-stack solutions.";

    if (isNextJs) {
      // --- NEXT.JS TSX INJECTION (Regex Architecture) ---
      let content = originalContent;
      
      // Update Title and Description in metadata object
      const titleRegex = /title:\s*['"`][^'"`]*['"`]/;
      const descRegex = /description:\s*['"`][^'"`]*['"`]/;
      
      if (titleRegex.test(content)) {
        content = content.replace(titleRegex, `title: '${newTitle}'`);
      }
      if (descRegex.test(content)) {
        content = content.replace(descRegex, `description: '${newDesc}'`);
      }
      
      updatedContent = content;
    } else {
      // --- STANDARD HTML INJECTION (Cheerio Architecture) ---
      const $ = cheerio.load(originalContent);
      
      // Inject or Modify <title>
      if ($('title').length > 0) {
        $('title').text(newTitle);
      } else {
        $('head').append(`<title>${newTitle}</title>`);
      }

      // Inject or Modify <meta name="description">
      if ($('meta[name="description"]').length > 0) {
        $('meta[name="description"]').attr('content', newDesc);
      } else {
        $('head').append(`<meta name="description" content="${newDesc}" />`);
      }

      // 🏆 New: H1 Tag Optimization (Visually Hidden Strategy)
      const h1Text = businessDesc ? `${businessDesc.split(' ').slice(0, 2).join(' ')} Premium Solutions` : `${url.replace('https://', '').split('.')[0].toUpperCase()} Official Site`;
      if ($('h1').length === 0) {
        $('body').prepend(`<h1 style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;">${h1Text}</h1>`);
      }

      // Inject JSON-LD Schema
      const schemaJSON = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": url.replace('https://', '').split('.')[0].toUpperCase(),
        "description": newDesc,
        "url": url,
        "address": { "@type": "PostalAddress", "addressLocality": "India", "addressCountry": "IN" }
      };
      
      $('head script[type="application/ld+json"]').remove();
      $('head').append(`\n    <script type="application/ld+json">\n    ${JSON.stringify(schemaJSON, null, 2)}\n    </script>\n  `);

      updatedContent = $.html();
    }
    
    // 4. Encode & Commit back to GitHub
    if (updatedContent === originalContent) {
      return NextResponse.json({ message: "Rankings already optimized. No changes needed." });
    }

    try {
      const commitRes = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: targetFilePath,
        message: `feat(seo): ⚡ Universal AI-SEO Hack on ${targetFilePath}`,
        content: Buffer.from(updatedContent, 'utf-8').toString('base64'),
        sha: fileData.sha,
        author: { name: "SEO Grandmaster Bot", email: "bot@grandmasterseo.local" }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: `Rankings deployed to ${isNextJs ? 'Next.js' : 'HTML'} core!`,
        commitHash: commitRes.data.commit?.sha,
        commitUrl: commitRes.data.commit?.html_url
      });

    } catch (e: any) {
      return NextResponse.json({ error: "Failed to push commit back to repository.", details: e.message }, { status: 500 });
    }

  } catch (err: any) {
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
