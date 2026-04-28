import { NextResponse } from 'next/server';
export const dynamic = 'force-static';
import { getDb } from '@/lib/db';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  try {
    const db = await getDb();

    // Stats calculations
    const todayHits = await db.get(
      "SELECT COUNT(*) as count FROM page_views WHERE timestamp >= date('now')"
    );
    const totalHits = await db.get("SELECT COUNT(*) as count FROM page_views");
    const topCities = await db.all(
      "SELECT city_name, COUNT(*) as count FROM page_views GROUP BY city_name ORDER BY count DESC LIMIT 5"
    );
    const recentActivity = await db.all(
      "SELECT page_url, city_name, referrer, timestamp FROM page_views ORDER BY timestamp DESC LIMIT 10"
    );

    return NextResponse.json({
      todayHits: todayHits?.count || 0,
      totalHits: totalHits?.count || 0,
      topCities,
      recentActivity,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Stats failed";
    console.error('Stats Error:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
