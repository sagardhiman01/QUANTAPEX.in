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
    const targetFilePath = 'index.html'; // Default target for root-level projects

    // 2. Fetch the target file
    let fileData;
    try {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: targetFilePath,
      });
      // @ts-ignore
      fileData = response.data;
    } catch (e: any) {
      return NextResponse.json({ error: \`Failed to fetch \${targetFilePath} from repository. Status: \${e.status}\` }, { status: 500 });
    }

    // Decode Base64 Content
    const originalContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const $ = cheerio.load(originalContent);

    // 3. AI / SEO Generation Engine (Simulated Logic based on context)
    const newTitle = businessDesc ? \`\${url.replace('https://', '').split('.')[0].toUpperCase()} | Top \${businessDesc.split(' ').slice(0, 3).join(' ')} Agency\` : "Top Digital SEO Solutions & Services";
    
    // Inject or Modify <title>
    if ($('title').length > 0) {
      $('title').text(newTitle);
    } else {
      $('head').append(\`<title>\${newTitle}</title>\`);
    }

    // Inject or Modify <meta name="description">
    const newDesc = businessDesc ? \`Leading the digital landscape. \${businessDesc.substring(0, 100)}...\` : "We provide the best digital SEO strategies and full-stack solutions.";
    if ($('meta[name="description"]').length > 0) {
      $('meta[name="description"]').attr('content', newDesc);
    } else {
      $('head').append(\`<meta name="description" content="\${newDesc}" />\`);
    }

    // Inject JSON-LD Schema
    const schemaJSON = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": url.replace('https://', '').split('.')[0].toUpperCase(),
      "description": newDesc,
      "url": url,
      "telephone": "+91-0000000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressCountry": "IN"
      }
    };
    
    // Clean up old schema if exists, then add the new one
    $('head script[type="application/ld+json"]').remove();
    $('head').append(\`\\n    <script type="application/ld+json">\\n    \${JSON.stringify(schemaJSON, null, 2)}\\n    </script>\\n  \`);

    // 4. Encode & Commit back to GitHub
    const updatedContent = $.html();
    
    if (updatedContent === originalContent) {
      return NextResponse.json({ message: "File already perfectly SEO optimized. No new commit needed." });
    }

    try {
      const commitRes = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: targetFilePath,
        message: "feat(seo): ⚡ Auto-Ranking Metadata and Schema Injection via Automation Tool",
        content: Buffer.from(updatedContent, 'utf-8').toString('base64'),
        sha: fileData.sha,
        author: {
          name: "SEO Grandmaster Bot",
          email: "bot@grandmasterseo.local",
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: "Rankings successfully deployed!",
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
