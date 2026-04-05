import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { url, referrer, device } = await req.json();
    const db = await getDb();

    // Extract city from PSEO route if applicable
    let city = 'Main Site';
    if (url.includes('/agency/')) {
      city = url.split('/agency/')[1].split('?')[0];
      city = city.charAt(0).toUpperCase() + city.slice(1);
    }

    await db.run(
      'INSERT INTO page_views (page_url, city_name, referrer, device_type, timestamp) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
      [url, city, referrer || 'direct', device || 'desktop']
    );

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Tracking failed";
    console.error('Analytics Error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
