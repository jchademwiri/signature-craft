import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { sql } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

// Read the DATABASE_URL from the .env file
const envFile = fs.readFileSync('.env', 'utf8');
const databaseUrlMatch = envFile.match(/DATABASE_URL=['"]([^'"]+)['"]/);
const databaseUrl = databaseUrlMatch ? databaseUrlMatch[1] : null;

if (!databaseUrl) {
  console.error('DATABASE_URL not found in .env file');
  process.exit(1);
}

console.log('Using database URL:', databaseUrl);

async function main() {
  try {
    // Create a SQL client
    const sql_client = neon(databaseUrl);
    const db = drizzle(sql_client);

    console.log('Adding primary_color and secondary_color columns to signatures table...');
    
    // Execute the SQL to add the columns
    await db.execute(sql`
      ALTER TABLE "signatures" 
      ADD COLUMN IF NOT EXISTS "primary_color" varchar(20),
      ADD COLUMN IF NOT EXISTS "secondary_color" varchar(20)
    `);
    
    console.log('Columns added successfully!');
  } catch (error) {
    console.error('Error adding columns:', error);
    process.exit(1);
  }
}

main();