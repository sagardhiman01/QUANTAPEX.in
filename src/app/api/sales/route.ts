import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { targetNiche, targetPainPoint, agencyName = "Quantapex" } = await req.json();

    if (!targetNiche) {
      return NextResponse.json({ error: "Target Niche is required" }, { status: 400 });
    }

    // AI Sales Engine Simulation
    // Generates high-conversion sales copy based on the targeted niche.
    
    // 1. Subject Line Generation (High Open Rate Triggers)
    const subjectLines = [
      `Quick Idea for ${targetNiche} client acquisition`,
      `Your competitor's online strategy...`,
      `Are you taking on new ${targetNiche} clients?`,
      `[Idea] Boosting revenue for ${targetNiche} businesses`
    ];
    const subjectLine = subjectLines[Math.floor(Math.random() * subjectLines.length)];

    // 2. Email Body Generation (Psychological FOMO & Authority)
    const emailTemplate = `Subject: ${subjectLine}

Hi [First Name],

I was analyzing the digital footprint for top ${targetNiche} businesses in your area and noticed a major gap in your current strategy, particularly regarding ${targetPainPoint || "high-value local search conversions"}.

At ${agencyName}, we don't just build websites; we engineer sales machines. We recently helped a similar business capture a 120% increase in qualified leads by fixing the exact technical issues currently bleeding your site's traffic.

I ran a raw diagnostic on your platform and found 3 immediate fixes that would instantly rank you above your local competitors. 

Would you be open to a 5-minute chat this Thursday to see the exact blueprint?

Best,
[Your Name]
Director of Growth, ${agencyName}
[Your Contact / Link]`;

    // 3. Sales Strategy & Deal Closing Angle
    const closingStrategy = `
### Quantapex Closing Strategy for ${targetNiche}

1. **The Hook (Fear of Missing Out):** Emphasize that their competitors are currently absorbing the traffic they are losing due to technical SEO leaks.
2. **The Authority Play:** Mention the "122ms pageload speed" and "Enterprise Architecture" standard that ${agencyName} brings. Frame your service not as an expense, but as a direct revenue channel.
3. **The Audit Close:** When you get them on a call, use the 'run analyze' feature from this dashboard on THEIR website live. Show them their red scores. Then show them Quantapex's perfect scores. The deal will close itself.
    `;

    // 4. Return the Payload
    return NextResponse.json({
      success: true,
      niche: targetNiche,
      subjectLine,
      emailTemplate,
      closingStrategy
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Sales Engine Error";
    return NextResponse.json({ error: "Sales Engine Error", details: message }, { status: 500 });
  }
}
