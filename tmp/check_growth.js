const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(process.cwd(), 'analytics.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('--- Database Tables ---');
db.all("SELECT name FROM sqlite_master WHERE type='table';", [], (err, tables) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(tables.map(t => t.name).join(', '));

  if (tables.some(t => t.name === 'page_views')) {
    console.log('\n--- Page Views Summary ---');
    db.all(`
      SELECT 
        DATE(timestamp) as date, 
        COUNT(*) as views 
      FROM page_views 
      GROUP BY DATE(timestamp) 
      ORDER BY date DESC 
      LIMIT 10;
    `, [], (err, rows) => {
      if (err) console.error(err);
      console.table(rows);

      console.log('\n--- Top Pages Today ---');
      db.all(`
        SELECT 
          page_url, 
          COUNT(*) as views 
        FROM page_views 
        WHERE DATE(timestamp) = DATE('now')
        GROUP BY page_url 
        ORDER BY views DESC 
        LIMIT 10;
      `, [], (err, rows) => {
        if (err) console.error(err);
        console.table(rows);
        db.close();
      });
    });
  } else {
    console.log('page_views table not found.');
    db.close();
  }
});
